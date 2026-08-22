/**
 * OmniSphere 360 - Interactive Leaflet Radar Mini-Map
 * Synchronizes a dynamic visual Field-of-View (FOV) cone and heading with the 360 camera
 */
class MapRadar {
  constructor(mapContainerId, options = {}) {
    this.containerId = mapContainerId;
    this.options = Object.assign({
      zoom: 16,
      coneDistanceMeters: 180,
      onLocationClick: null
    }, options);

    this.map = null;
    this.centerMarker = null;
    this.radarConePolygon = null;
    this.currentLat = 0;
    this.currentLng = 0;
    this.currentHeading = 180;
    this.currentFov = 75;

    this.init();
  }

  init() {
    const el = document.getElementById(this.containerId);
    if (!el || typeof L === 'undefined') {
      console.warn('Leaflet or map container not available.');
      return;
    }

    // Initialize Leaflet Map
    this.map = L.map(this.containerId, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: true
    }).setView([20, 0], 2);

    // Dark sleek CartoDB tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(this.map);

    // Add minimal zoom control in top right
    L.control.zoom({ position: 'topright' }).addTo(this.map);
  }

  /**
   * Set or update current location on map
   */
  setLocation(lat, lng, name = '') {
    if (!this.map || isNaN(lat) || isNaN(lng) || (lat === 0 && lng === 0)) return;

    this.currentLat = lat;
    this.currentLng = lng;

    this.map.setView([lat, lng], this.options.zoom, { animate: true });

    // Custom glowing center icon
    const radarIcon = L.divIcon({
      className: 'radar-marker-pin',
      html: `
        <div style="
          width: 14px;
          height: 14px;
          background: #38bdf8;
          border: 2px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 12px #38bdf8;
          transform: translate(-50%, -50%);
        "></div>
      `,
      iconSize: [14, 14]
    });

    if (this.centerMarker) {
      this.centerMarker.setLatLng([lat, lng]);
    } else {
      this.centerMarker = L.marker([lat, lng], { icon: radarIcon }).addTo(this.map);
    }

    this.updateRadarCone(this.currentHeading, this.currentFov);
  }

  /**
   * Calculate destination point given distance & bearing in degrees
   */
  computeDestinationPoint(lat, lng, distanceMeters, bearingDeg) {
    const R = 6378137; // Earth's radius in meters
    const d = distanceMeters / R;
    const brng = THREE.MathUtils.degToRad(bearingDeg);
    const lat1 = THREE.MathUtils.degToRad(lat);
    const lon1 = THREE.MathUtils.degToRad(lng);

    const lat2 = Math.asin(Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(brng));
    const lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(d) * Math.cos(lat1), Math.cos(d) - Math.sin(lat1) * Math.sin(lat2));

    return [THREE.MathUtils.radToDeg(lat2), THREE.MathUtils.radToDeg(lon2)];
  }

  /**
   * Update the visual FOV radar wedge on map
   */
  updateRadarCone(heading, fov = 75) {
    if (!this.map || !this.currentLat || !this.currentLng) return;

    this.currentHeading = heading;
    this.currentFov = fov;

    const halfFov = fov / 2;
    const leftBearing = (heading - halfFov + 360) % 360;
    const rightBearing = (heading + halfFov + 360) % 360;

    const center = [this.currentLat, this.currentLng];
    const steps = 8;
    const arcPoints = [];

    for (let i = 0; i <= steps; i++) {
      const b = leftBearing + (fov * (i / steps));
      const pt = this.computeDestinationPoint(this.currentLat, this.currentLng, this.options.coneDistanceMeters, b);
      arcPoints.push(pt);
    }

    const polygonPoints = [center, ...arcPoints, center];

    if (this.radarConePolygon) {
      this.radarConePolygon.setLatLngs(polygonPoints);
    } else {
      this.radarConePolygon = L.polygon(polygonPoints, {
        color: '#38bdf8',
        weight: 1.5,
        fillColor: '#38bdf8',
        fillOpacity: 0.28,
        stroke: true
      }).addTo(this.map);
    }
  }

  invalidateSize() {
    if (this.map) {
      setTimeout(() => this.map.invalidateSize(), 150);
    }
  }
}

window.MapRadar = MapRadar;
