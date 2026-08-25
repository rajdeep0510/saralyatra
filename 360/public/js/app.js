/**
 * OmniSphere 360 - Main Frontend Application Controller
 */

let viewer = null;
let mapRadar = null;
let audioGuide = null;

let currentPlace = null;
let currentNodeIndex = 0;
let curatedList = [];
let searchDebounceTimer = null;

// ==========================================
// Initialization on DOM Ready
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
  initViewer();
  initMapRadar();
  initAudioGuide();
  initEventListeners();
  await loadCuratedPlaces();
});

/**
 * 1. Initialize Three.js 360 Viewer
 */
function initViewer() {
  const container = document.getElementById('viewportContainer');

  viewer = new Viewer360(container, {
    fov: 75,
    onHeadingChange: (heading, pitch, fov) => {
      document.getElementById('hudHeading').innerText = `${heading}°`;
      document.getElementById('hudPitch').innerText = `${pitch}°`;
      document.getElementById('hudFov').innerText = `${fov}°`;

      if (mapRadar) {
        mapRadar.updateRadarCone(heading, fov);
      }
    },
    onHotspotClick: (hotspot) => {
      showToast(`📍 ${hotspot.title}`);
      if (audioGuide) {
        audioGuide.speak(`${hotspot.title}. ${hotspot.description}`);
      }
    },
    onTextureLoaded: () => {
      hideLoader();
    },
    onTextureError: () => {
      hideLoader();
      showToast('⚠️ Panorama network error, loaded dynamic fallback.');
    }
  });
}

/**
 * 2. Initialize Leaflet Radar Mini-Map
 */
function initMapRadar() {
  mapRadar = new MapRadar('radarMap', {
    zoom: 15,
    coneDistanceMeters: 220
  });
}

/**
 * 3. Initialize Audio Guide & Soundscape
 */
function initAudioGuide() {
  const ticker = document.getElementById('audioNarratorText');
  const eq = document.getElementById('audioEqualizer');

  audioGuide = new AudioGuide({
    onStart: (text) => {
      document.getElementById('btnAudioGuide').classList.add('active');
      eq.classList.add('playing');
      ticker.innerText = text;
    },
    onEnd: () => {
      document.getElementById('btnAudioGuide').classList.remove('active');
      eq.classList.remove('playing');
      ticker.innerText = 'Audio tour paused. Click to listen.';
    },
    onError: () => {
      document.getElementById('btnAudioGuide').classList.remove('active');
      eq.classList.remove('playing');
    }
  });
}

/**
 * 4. Load Curated Places from Backend
 */
async function loadCuratedPlaces(category = 'all') {
  showLoader('Loading curated 360° virtual wonders...');
  try {
    const url = category === 'all' ? '/api/places/curated' : `/api/places/curated?category=${encodeURIComponent(category)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.success && data.places.length > 0) {
      curatedList = data.places;
      renderCuratedList(curatedList);

      // Select first place by default if no current place
      if (!currentPlace) {
        selectPlace(curatedList[0]);
      }
    }
  } catch (err) {
    console.error('Failed to load places:', err);
    showToast('Failed to load places library.');
  } finally {
    hideLoader();
  }
}

/**
 * Render Place Cards in Sidebar
 */
function renderCuratedList(places) {
  const container = document.getElementById('placesList');
  container.innerHTML = '';

  if (places.length === 0) {
    container.innerHTML = `
      <div style="padding: 30px 20px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
        No 360° experiences found in this category.
      </div>
    `;
    return;
  }

  places.forEach(place => {
    const card = document.createElement('div');
    const isActive = currentPlace && currentPlace.id === place.id;
    card.className = `place-card ${isActive ? 'active' : ''}`;
    card.dataset.id = place.id;

    card.innerHTML = `
      <img class="place-thumbnail" src="${place.coverImage || 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300'}" alt="${place.name}" loading="lazy" />
      <div class="place-info">
        <div class="place-card-top">
          <div class="place-name">${place.name}</div>
          <span class="badge-360">360° VR</span>
        </div>
        <div class="place-location-sub">📍 ${place.city || ''}${place.state ? ', ' + place.state : ''}</div>
        <div class="place-meta-row">
          <span class="tag-category">${place.category}</span>
          <span>⏱️ ${place.recommendedDuration || 60}m</span>
        </div>
      </div>
    `;

    card.addEventListener('click', () => selectPlace(place));
    container.appendChild(card);
  });
}

/**
 * Select & Render a Place in 360
 */
async function selectPlace(place, nodeIdx = 0) {
  currentPlace = place;
  currentNodeIndex = nodeIdx;

  // Highlight active sidebar card
  document.querySelectorAll('.place-card').forEach(card => {
    card.classList.toggle('active', card.dataset.id === place.id);
  });

  // Update Floating Meta HUD
  document.getElementById('hudPlaceTitle').innerText = place.name;
  document.getElementById('hudPlaceLocation').innerText = `📍 ${[place.city, place.state, place.country].filter(Boolean).join(', ')}`;
  document.getElementById('hudCategoryBadge').innerText = place.category || '360 Exploration';
  document.getElementById('hudDurationBadge').innerText = `⏱️ ${place.recommendedDuration || 45} min`;

  // Update Weather if available
  const weatherBadge = document.getElementById('hudWeatherBadge');
  if (place.weather) {
    weatherBadge.innerText = `${place.weather.condition} ${place.weather.temperature}`;
    weatherBadge.style.display = 'inline-block';
  } else {
    weatherBadge.style.display = 'none';
  }

  // Update Multi-Node Viewpoints Bar
  renderViewpointsBar(place);

  // Update Leaflet Radar Map
  if (mapRadar && place.latitude && place.longitude) {
    mapRadar.setLocation(place.latitude, place.longitude, place.name);
    mapRadar.invalidateSize();
  }

  // Pick Current Node Panorama
  const node = (place.nodes && place.nodes[nodeIdx]) ? place.nodes[nodeIdx] : {
    name: '360° Panoramic View',
    panoramaUrl: place.coverImage || 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/textures/2294472375_24a3b8ef46_o.jpg',
    heading: place.defaultHeading || 180,
    pitch: place.defaultPitch || 0,
    hotspots: []
  };

  showLoader(`Teleporting to ${place.name}...`);

  try {
    await viewer.loadPanorama(
      node.panoramaUrl,
      node.fallbackUrl || null,
      node.heading || place.defaultHeading || 180,
      node.pitch || place.defaultPitch || 0,
      node.hotspots || []
    );
  } catch (err) {
    console.warn('Error loading panorama:', err);
  } finally {
    hideLoader();
  }

  // Update Audio Guide text
  const narrative = place.audioNarrative || place.description || `Welcome to ${place.name}. Explore in 360°.`;
  document.getElementById('audioNarratorText').innerText = narrative;
}

/**
 * Render Viewpoints (Nodes) bar
 */
function renderViewpointsBar(place) {
  const bar = document.getElementById('viewpointsBar');
  bar.innerHTML = '';

  if (!place.nodes || place.nodes.length <= 1) {
    bar.style.display = 'none';
    return;
  }

  bar.style.display = 'flex';
  place.nodes.forEach((node, idx) => {
    const btn = document.createElement('button');
    btn.className = `node-chip ${idx === currentNodeIndex ? 'active' : ''}`;
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
        <circle cx="12" cy="12" r="4"></circle>
      </svg>
      ${node.name}
    `;

    btn.addEventListener('click', () => {
      selectPlace(place, idx);
    });

    bar.appendChild(btn);
  });
}

/**
 * Universal Search & Autocomplete
 */
function handleSearchInput(e) {
  const query = e.target.value.trim();
  const dropdown = document.getElementById('searchResultsDropdown');

  clearTimeout(searchDebounceTimer);

  if (query.length < 2) {
    dropdown.classList.remove('open');
    dropdown.innerHTML = '';
    return;
  }

  searchDebounceTimer = setTimeout(async () => {
    try {
      const res = await fetch(`/api/places/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (!data.success) return;

      dropdown.innerHTML = '';
      let hasResults = false;

      // Section 1: Curated Heritage 360 Tours
      if (data.curatedMatches && data.curatedMatches.length > 0) {
        hasResults = true;
        const header = document.createElement('div');
        header.className = 'dropdown-section-title';
        header.innerText = '⭐ Curated 360° Heritage Tours';
        dropdown.appendChild(header);

        data.curatedMatches.forEach(place => {
          const item = document.createElement('div');
          item.className = 'search-result-item';
          item.innerHTML = `
            <div class="search-result-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <div class="search-result-content">
              <div class="search-result-title">${place.name}</div>
              <div class="search-result-sub">${place.city}, ${place.country}</div>
            </div>
            <span class="search-result-badge">Verified 360</span>
          `;
          item.addEventListener('click', () => {
            dropdown.classList.remove('open');
            selectPlace(place);
          });
          dropdown.appendChild(item);
        });
      }

      // Section 2: Global Geocoded Places (OpenStreetMap / Wikipedia)
      if (data.geoResults && data.geoResults.length > 0) {
        hasResults = true;
        const header = document.createElement('div');
        header.className = 'dropdown-section-title';
        header.innerText = '🌍 Global Geocoded Places';
        dropdown.appendChild(header);

        data.geoResults.slice(0, 4).forEach(geo => {
          const item = document.createElement('div');
          item.className = 'search-result-item';
          item.innerHTML = `
            <div class="search-result-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>
            </div>
            <div class="search-result-content">
              <div class="search-result-title">${geo.name}</div>
              <div class="search-result-sub">${geo.displayName}</div>
            </div>
            <span class="search-result-badge">Global GPS</span>
          `;
          item.addEventListener('click', async () => {
            dropdown.classList.remove('open');
            showLoader(`Generating 360 view for ${geo.name}...`);
            try {
              const fullSearchRes = await fetch(`/api/places/search?q=${encodeURIComponent(geo.name)}`);
              const fullData = await fullSearchRes.json();
              if (fullData.primaryPlace) {
                selectPlace(fullData.primaryPlace);
              }
            } catch (err) {
              console.error(err);
            } finally {
              hideLoader();
            }
          });
          dropdown.appendChild(item);
        });
      }

      if (hasResults) {
        dropdown.classList.add('open');
      } else {
        dropdown.classList.remove('open');
      }
    } catch (err) {
      console.warn('Search error:', err);
    }
  }, 220);
}

/**
 * Handle Enter Key on Search Bar
 */
async function handleSearchSubmit(e) {
  if (e.key === 'Enter') {
    const query = e.target.value.trim();
    if (!query) return;

    document.getElementById('searchResultsDropdown').classList.remove('open');
    showLoader(`Searching 360° views for "${query}"...`);

    try {
      const res = await fetch(`/api/places/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (data.success && data.primaryPlace) {
        selectPlace(data.primaryPlace);
        showToast(`📍 Found 360° perspective for ${data.primaryPlace.name}`);
      } else {
        showToast(`No exact match for "${query}". Try popular landmarks.`);
      }
    } catch (err) {
      showToast('Search request failed.');
    } finally {
      hideLoader();
    }
  }
}

/**
 * Postcard Snapshot Generator
 */
function generatePostcardSnapshot() {
  if (!currentPlace) return;

  const canvas = document.getElementById('snapshotCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 960;
  canvas.height = 540;

  // 1. Dark ambient background gradient
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, '#0a0f1d');
  grad.addColorStop(1, '#060913');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Draw current WebGL viewport frame
  const webglCanvas = document.querySelector('#canvas360 canvas');
  if (webglCanvas) {
    try {
      ctx.drawImage(webglCanvas, 20, 20, 920, 420);
    } catch (e) {
      console.warn('Canvas export restriction:', e);
    }
  }

  // 3. Postcard Bottom Banner
  ctx.fillStyle = 'rgba(11, 17, 32, 0.95)';
  ctx.fillRect(20, 440, 920, 80);

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
  ctx.lineWidth = 1;
  ctx.strokeRect(20, 440, 920, 80);

  // Title
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 22px Outfit, sans-serif';
  ctx.fillText(currentPlace.name.toUpperCase(), 40, 475);

  // Location & Timestamp
  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px Plus Jakarta Sans, sans-serif';
  const coords = currentPlace.latitude ? `${currentPlace.latitude.toFixed(4)}°N, ${currentPlace.longitude.toFixed(4)}°E • ` : '';
  ctx.fillText(`📍 ${coords}${[currentPlace.city, currentPlace.country].filter(Boolean).join(', ')} • ${new Date().toLocaleDateString()}`, 40, 502);

  // Souvenir Stamp
  ctx.fillStyle = '#818cf8';
  ctx.font = 'bold 13px Outfit, sans-serif';
  ctx.fillText('OMNISPHERE 360° SOUVENIR', 700, 485);

  // Open Modal
  document.getElementById('snapshotModal').classList.add('open');
}

function downloadSnapshot() {
  const canvas = document.getElementById('snapshotCanvas');
  const link = document.createElement('a');
  link.download = `${(currentPlace?.name || 'omnisphere-360').toLowerCase().replace(/\s+/g, '-')}-postcard.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
  showToast('✅ Postcard Snapshot Downloaded!');
}

/**
 * Custom 360 Loader (Drag & Drop or URL)
 */
function handleCustom360Submit() {
  const title = document.getElementById('customNameInput').value.trim() || 'Custom 360 Horizon';
  const url = document.getElementById('customUrlInput').value.trim();

  if (!url) {
    showToast('Please enter an image URL or drop a 360 photo.');
    return;
  }

  const customPlace = {
    id: `user-${Date.now()}`,
    name: title,
    city: 'Custom Space',
    country: 'User Upload',
    category: 'Custom 360 Panorama',
    latitude: 0,
    longitude: 0,
    defaultHeading: 180,
    coverImage: url,
    description: `Custom 360 panoramic equirectangular perspective loaded into Three.js WebGL engine.`,
    audioNarrative: `You are viewing custom 360 panorama ${title}.`,
    nodes: [
      {
        id: 'user-node-1',
        name: 'Custom Viewpoint',
        panoramaUrl: url,
        heading: 180,
        hotspots: []
      }
    ]
  };

  closeModals();
  selectPlace(customPlace);
  showToast(`🌐 Loaded custom 360 view: ${title}`);
}

/**
 * 5. Setup All Event Listeners
 */
function initEventListeners() {
  // Brand click resets to first place
  document.getElementById('brandLogo').addEventListener('click', () => {
    if (curatedList.length > 0) selectPlace(curatedList[0]);
  });

  // Search input & enter
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', handleSearchInput);
  searchInput.addEventListener('keydown', handleSearchSubmit);

  // Close search dropdown on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-search-container')) {
      document.getElementById('searchResultsDropdown').classList.remove('open');
    }
  });

  // Category Pills Filter
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const category = pill.dataset.category;
      loadCuratedPlaces(category);
    });
  });

  // Sidebar Collapse Toggle
  document.getElementById('btnToggleSidebar').addEventListener('click', () => {
    const sidebar = document.getElementById('appSidebar');
    sidebar.classList.toggle('collapsed');
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 310);
  });

  // Cardinal Heading Buttons (N, S, E, W)
  document.querySelectorAll('.btn-cardinal[data-heading]').forEach(btn => {
    btn.addEventListener('click', () => {
      const heading = parseInt(btn.dataset.heading, 10);
      viewer.setOrientation(heading);
      showToast(`🧭 Heading aligned to ${heading}°`);
    });
  });

  // Audio Guide Toggle
  document.getElementById('btnAudioGuide').addEventListener('click', () => {
    if (!currentPlace) return;
    const text = currentPlace.audioNarrative || currentPlace.description;
    const isPlaying = audioGuide.toggleNarration(text);
    showToast(isPlaying ? '🎧 AI Audio Guide Playing' : '🔇 Audio Guide Paused');
  });

  document.getElementById('btnAudioControl').addEventListener('click', () => {
    if (!currentPlace) return;
    const text = currentPlace.audioNarrative || currentPlace.description;
    audioGuide.toggleNarration(text);
  });

  // Ambient Soundscape Toggle
  document.getElementById('btnAmbientSound').addEventListener('click', () => {
    const isPlaying = audioGuide.toggleAmbientSound();
    const btn = document.getElementById('btnAmbientSound');
    btn.classList.toggle('active', isPlaying);
    showToast(isPlaying ? '🎵 Ambient Soundscape Enabled' : '🔇 Ambient Soundscape Muted');
  });

  // Auto-Rotate Toggle
  document.getElementById('btnAutoRotate').addEventListener('click', () => {
    const isAuto = viewer.toggleAutoRotate();
    const btn = document.getElementById('btnAutoRotate');
    btn.classList.toggle('active', isAuto);
    showToast(isAuto ? '🔄 Auto-Rotation Enabled' : '⏸️ Auto-Rotation Paused');
  });

  // Fullscreen Toggle
  document.getElementById('btnFullscreen').addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen().catch(err => console.log(err));
    }
  });

  // Postcard Snapshot
  document.getElementById('btnSnapshot').addEventListener('click', generatePostcardSnapshot);
  document.getElementById('btnDownloadSnapshot').addEventListener('click', downloadSnapshot);

  // Info Modal
  document.getElementById('btnInfoModal').addEventListener('click', openInfoModal);

  // Custom 360 Upload Modal
  document.getElementById('btnCustom360').addEventListener('click', () => {
    document.getElementById('custom360Modal').classList.add('open');
  });
  document.getElementById('btnLoadCustom360').addEventListener('click', handleCustom360Submit);

  // Preset demo 360 buttons in custom modal
  document.querySelectorAll('.preset-btn[data-url]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('customUrlInput').value = btn.dataset.url;
      document.getElementById('customNameInput').value = btn.dataset.name || 'Demo 360';
    });
  });

  // Drag & drop file reader
  const dropZone = document.getElementById('customDropZone');
  if (dropZone) {
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = 'var(--accent-cyan)';
    });
    dropZone.addEventListener('dragleave', () => {
      dropZone.style.borderColor = 'var(--border-subtle)';
    });
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = 'var(--border-subtle)';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();
        reader.onload = (loadEvt) => {
          document.getElementById('customUrlInput').value = loadEvt.target.result;
          document.getElementById('customNameInput').value = file.name.replace(/\.[^/.]+$/, '');
          showToast('📁 Loaded local 360 image file');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Close modals on close button or backdrop click
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', closeModals);
  });
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModals();
    });
  });
}

function openInfoModal() {
  if (!currentPlace) return;
  document.getElementById('infoModalTitle').innerText = currentPlace.name;
  document.getElementById('infoModalLocation').innerText = `${currentPlace.city}, ${currentPlace.country}`;
  document.getElementById('infoModalDescription').innerText = currentPlace.description;

  const factsList = document.getElementById('infoModalFacts');
  factsList.innerHTML = '';
  (currentPlace.facts || []).forEach(f => {
    const li = document.createElement('li');
    li.style.marginBottom = '6px';
    li.innerText = f;
    factsList.appendChild(li);
  });

  document.getElementById('infoModal').classList.add('open');
}

function closeModals() {
  document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('open'));
}

// Helpers
function showLoader(msg = 'Loading 360° Scene...') {
  const el = document.getElementById('loaderOverlay');
  document.getElementById('loaderText').innerText = msg;
  el.classList.remove('hidden');
}

function hideLoader() {
  const el = document.getElementById('loaderOverlay');
  el.classList.add('hidden');
}

let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toastNotification');
  const text = document.getElementById('toastMessage');
  text.innerText = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
