/**
 * OmniSphere 360 - Three.js WebGL Panoramic Viewer Engine
 */
class Viewer360 {
  constructor(canvasContainer, options = {}) {
    this.container = canvasContainer;
    this.options = Object.assign({
      fov: 75,
      minFov: 30,
      maxFov: 105,
      autoRotate: false,
      autoRotateSpeed: 0.15,
      dampingFactor: 0.08,
      onHeadingChange: null,
      onHotspotClick: null,
      onTextureLoaded: null,
      onTextureError: null
    }, options);

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.sphereMesh = null;
    this.textureLoader = null;

    // Orientation angles (degrees)
    this.lon = 180;
    this.lat = 0;
    this.targetLon = 180;
    this.targetLat = 0;
    this.fov = this.options.fov;
    this.targetFov = this.options.fov;

    // Interaction state
    this.isUserInteracting = false;
    this.onPointerDownPointerX = 0;
    this.onPointerDownPointerY = 0;
    this.onPointerDownLon = 0;
    this.onPointerDownLat = 0;
    this.autoRotate = this.options.autoRotate;
    this.gyroEnabled = false;

    // Current scene node & hotspots
    this.currentNode = null;
    this.hotspots = [];
    this.hotspotElements = [];
    this.hotspotOverlayContainer = null;

    this.init();
  }

  init() {
    // 1. Scene & Camera
    this.scene = new THREE.Scene();
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(this.fov, aspect, 0.1, 1200);
    this.camera.target = new THREE.Vector3(0, 0, 0);

    // 2. WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.container.appendChild(this.renderer.domElement);

    // 3. 360 Inverted Sphere Geometry
    const geometry = new THREE.SphereGeometry(500, 64, 32);
    // Invert geometry so inside of sphere faces camera
    geometry.scale(-1, 1, 1);

    const material = new THREE.MeshBasicMaterial({
      color: 0x111827,
      transparent: false
    });

    this.sphereMesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.sphereMesh);

    // 4. Texture Loader
    this.textureLoader = new THREE.TextureLoader();
    this.textureLoader.setCrossOrigin('anonymous');

    // 5. Hotspot HTML Overlay Container
    this.hotspotOverlayContainer = document.createElement('div');
    this.hotspotOverlayContainer.className = 'hotspot-overlay-layer';
    this.hotspotOverlayContainer.style.position = 'absolute';
    this.hotspotOverlayContainer.style.inset = '0';
    this.hotspotOverlayContainer.style.pointerEvents = 'none';
    this.hotspotOverlayContainer.style.overflow = 'hidden';
    this.container.appendChild(this.hotspotOverlayContainer);

    // 6. Bind Listeners & Start Loop
    this.bindEvents();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  /**
   * Load an Equirectangular 360 Panorama Texture
   */
  loadPanorama(url, fallbackUrl = null, heading = 180, pitch = 0, hotspots = []) {
    return new Promise((resolve, reject) => {
      this.hotspots = hotspots || [];
      this.targetLon = heading;
      this.lon = heading;
      this.targetLat = pitch;
      this.lat = pitch;

      this.clearHotspots();

      const applyTexture = (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;

        this.sphereMesh.material.map = texture;
        this.sphereMesh.material.needsUpdate = true;

        this.renderHotspots();

        if (this.options.onTextureLoaded) {
          this.options.onTextureLoaded(url);
        }
        resolve(texture);
      };

      this.textureLoader.load(
        url,
        applyTexture,
        undefined,
        (err) => {
          console.warn(`Primary 360 panorama load failed for ${url}. Trying fallback...`, err);
          if (fallbackUrl) {
            this.textureLoader.load(
              fallbackUrl,
              applyTexture,
              undefined,
              (fallbackErr) => {
                console.error('Fallback 360 panorama failed:', fallbackErr);
                if (this.options.onTextureError) this.options.onTextureError(fallbackErr);
                reject(fallbackErr);
              }
            );
          } else {
            if (this.options.onTextureError) this.options.onTextureError(err);
            reject(err);
          }
        }
      );
    });
  }

  /**
   * Render HTML 3D Interactive Hotspot Pins
   */
  renderHotspots() {
    this.clearHotspots();

    this.hotspots.forEach(hs => {
      const pin = document.createElement('div');
      pin.className = 'hotspot-pin';
      pin.dataset.id = hs.id;

      // Icon determination
      const iconSvg = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <circle cx="12" cy="12" r="5"></circle>
          <path d="M12 2v3m0 14v3m10-10h-3M5 12H2"></path>
        </svg>
      `;

      pin.innerHTML = `
        <div class="hotspot-icon-circle">
          ${iconSvg}
        </div>
        <div class="hotspot-tooltip-card">
          <div class="hotspot-tooltip-title">${hs.title}</div>
          <div class="hotspot-tooltip-desc">${hs.description}</div>
        </div>
      `;

      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.options.onHotspotClick) {
          this.options.onHotspotClick(hs);
        }
      });

      this.hotspotOverlayContainer.appendChild(pin);
      this.hotspotElements.push({ data: hs, el: pin });
    });
  }

  clearHotspots() {
    this.hotspotOverlayContainer.innerHTML = '';
    this.hotspotElements = [];
  }

  /**
   * Update 2D Screen Positions of 3D Hotspots
   */
  updateHotspotsPositions() {
    if (this.hotspotElements.length === 0) return;

    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.hotspotElements.forEach(item => {
      const hs = item.data;
      const el = item.el;

      // Convert spherical yaw & pitch (degrees) to 3D Cartesian coordinates on sphere
      const phi = THREE.MathUtils.degToRad(90 - hs.pitch);
      const theta = THREE.MathUtils.degToRad(hs.yaw);

      const radius = 480;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      const pos = new THREE.Vector3(x, y, z);
      pos.project(this.camera);

      // Check if hotspot is in front of camera (pos.z < 1.0)
      if (pos.z < 1.0 && pos.x >= -1.2 && pos.x <= 1.2 && pos.y >= -1.2 && pos.y <= 1.2) {
        const screenX = (pos.x * 0.5 + 0.5) * width;
        const screenY = (-(pos.y * 0.5) + 0.5) * height;

        el.style.display = 'block';
        el.style.left = `${screenX}px`;
        el.style.top = `${screenY}px`;
      } else {
        el.style.display = 'none';
      }
    });
  }

  /**
   * Set Heading & Pitch Programmatically
   */
  setOrientation(heading, pitch = null) {
    this.targetLon = heading;
    if (pitch !== null) this.targetLat = pitch;
  }

  /**
   * Set Zoom / FOV Programmatically
   */
  setFov(newFov) {
    this.targetFov = Math.max(this.options.minFov, Math.min(this.options.maxFov, newFov));
  }

  toggleAutoRotate(enable = null) {
    this.autoRotate = enable !== null ? enable : !this.autoRotate;
    return this.autoRotate;
  }

  /**
   * Event Listeners for Mouse, Touch, Wheel & Resize
   */
  bindEvents() {
    const dom = this.container;

    const onPointerDown = (e) => {
      if (e.isPrimary === false) return;
      this.isUserInteracting = true;

      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      this.onPointerDownPointerX = clientX;
      this.onPointerDownPointerY = clientY;
      this.onPointerDownLon = this.targetLon;
      this.onPointerDownLat = this.targetLat;

      document.addEventListener('pointermove', onPointerMove, false);
      document.addEventListener('pointerup', onPointerUp, false);
    };

    const onPointerMove = (e) => {
      if (!this.isUserInteracting) return;

      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      const fovFactor = this.fov / 75;
      const deltaX = (clientX - this.onPointerDownPointerX) * 0.15 * fovFactor;
      const deltaY = (clientY - this.onPointerDownPointerY) * 0.15 * fovFactor;

      this.targetLon = this.onPointerDownLon - deltaX;
      this.targetLat = Math.max(-85, Math.min(85, this.onPointerDownLat + deltaY));
    };

    const onPointerUp = () => {
      this.isUserInteracting = false;
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    };

    const onWheel = (e) => {
      e.preventDefault();
      const zoomStep = e.deltaY * 0.05;
      this.targetFov = Math.max(this.options.minFov, Math.min(this.options.maxFov, this.targetFov + zoomStep));
    };

    const onResize = () => {
      if (!this.container || !this.renderer || !this.camera) return;
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    };

    dom.addEventListener('pointerdown', onPointerDown, false);
    dom.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', onResize, false);
  }

  /**
   * Main Render Loop
   */
  animate() {
    requestAnimationFrame(this.animate);

    // Auto rotate when idle
    if (this.autoRotate && !this.isUserInteracting) {
      this.targetLon += this.options.autoRotateSpeed;
    }

    // Smooth inertia interpolation
    this.lon += (this.targetLon - this.lon) * this.options.dampingFactor;
    this.lat += (this.targetLat - this.lat) * this.options.dampingFactor;
    this.fov += (this.targetFov - this.fov) * this.options.dampingFactor;

    // Normalize longitude to [0, 360)
    let normalizedHeading = Math.round(((this.lon % 360) + 360) % 360);

    // Update FOV on camera
    if (Math.abs(this.camera.fov - this.fov) > 0.01) {
      this.camera.fov = this.fov;
      this.camera.updateProjectionMatrix();
    }

    // Convert spherical angles to target vector
    const phi = THREE.MathUtils.degToRad(90 - this.lat);
    const theta = THREE.MathUtils.degToRad(this.lon);

    const x = 500 * Math.sin(phi) * Math.cos(theta);
    const y = 500 * Math.cos(phi);
    const z = 500 * Math.sin(phi) * Math.sin(theta);

    this.camera.lookAt(x, y, z);

    // Render WebGL
    this.renderer.render(this.scene, this.camera);

    // Update 3D projected hotspots
    this.updateHotspotsPositions();

    // Fire heading change listener for Leaflet radar mini-map
    if (this.options.onHeadingChange) {
      this.options.onHeadingChange(normalizedHeading, Math.round(this.lat), Math.round(this.fov));
    }
  }

  /**
   * Dispose resources
   */
  destroy() {
    if (this.renderer) {
      this.renderer.dispose();
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

window.Viewer360 = Viewer360;
