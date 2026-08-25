const express = require('express');
const cors = require('cors');
const path = require('path');
const curatedPlaces = require('./data/curatedPlaces');
const GeoService = require('./services/geoService');
const PanoramaService = require('./services/panoramaService');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/t1', (req, res) => res.sendFile(path.join(__dirname, 't1.html')));
app.get('/t1.html', (req, res) => res.sendFile(path.join(__dirname, 't1.html')));

// ==========================================
// API Routes
// ==========================================

/**
 * GET /api/places/curated
 * Returns curated list of 360 virtual tours
 */
app.get('/api/places/curated', (req, res) => {
  try {
    const category = req.query.category;
    let list = curatedPlaces;
    if (category && category !== 'all') {
      list = curatedPlaces.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    res.json({ success: true, count: list.length, places: list });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/places/search
 * Universal search for any place: checks curated database, OSM geocoding, and Wikimedia 360s
 */
app.get('/api/places/search', async (req, res) => {
  try {
    const query = req.query.q?.trim();
    if (!query) {
      return res.status(400).json({ success: false, error: 'Query parameter "q" is required.' });
    }

    // 1. Check curated matches
    const curatedMatches = curatedPlaces.filter(p => {
      const q = query.toLowerCase();
      return p.name.toLowerCase().includes(q) ||
             p.city.toLowerCase().includes(q) ||
             (p.state && p.state.toLowerCase().includes(q)) ||
             (p.country && p.country.toLowerCase().includes(q)) ||
             p.category.toLowerCase().includes(q);
    });

    // 2. Perform real geocoding search via OpenStreetMap
    const geoResults = await GeoService.geocode(query);

    // 3. Fetch Wikipedia summary & 360 panorama for primary match
    let primaryPlace = null;
    if (curatedMatches.length > 0) {
      primaryPlace = curatedMatches[0];
    } else if (geoResults.length > 0) {
      const topGeo = geoResults[0];
      const wikiData = await GeoService.getWikiSummary(topGeo.name || query);
      primaryPlace = await PanoramaService.resolve360View(topGeo.name || query, topGeo, wikiData);
    } else {
      const wikiData = await GeoService.getWikiSummary(query);
      if (wikiData) {
        primaryPlace = await PanoramaService.resolve360View(query, null, wikiData);
      }
    }

    // 4. Enrich primary place with live weather if coordinates exist
    if (primaryPlace && primaryPlace.latitude && primaryPlace.longitude) {
      const weather = await GeoService.getWeather(primaryPlace.latitude, primaryPlace.longitude);
      primaryPlace.weather = weather;
    }

    res.json({
      success: true,
      query,
      curatedMatches,
      geoResults,
      primaryPlace
    });
  } catch (err) {
    console.error('Search API error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/places/:id
 * Retrieve full details for a specific place
 */
app.get('/api/places/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const place = curatedPlaces.find(p => p.id === id);
    if (!place) {
      return res.status(404).json({ success: false, error: 'Place not found in curated library.' });
    }

    // Fetch live weather
    const weather = await GeoService.getWeather(place.latitude, place.longitude);

    res.json({
      success: true,
      place: {
        ...place,
        weather
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/places/wiki
 * Fetch Wikipedia insights for a query
 */
app.get('/api/wiki/info', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ success: false, error: 'Query is required' });

    const wikiData = await GeoService.getWikiSummary(query);
    res.json({ success: true, wiki: wikiData });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/weather
 * Fetch weather for given lat/lng
 */
app.get('/api/weather', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) return res.status(400).json({ success: false, error: 'lat and lng required' });

    const weather = await GeoService.getWeather(parseFloat(lat), parseFloat(lng));
    res.json({ success: true, weather });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/places/custom
 * Create a dynamic 360 place from user input or uploaded equirectangular 360 image
 */
app.post('/api/places/custom', (req, res) => {
  try {
    const { name, panoramaUrl, latitude, longitude, description, city, country } = req.body;
    if (!name || !panoramaUrl) {
      return res.status(400).json({ success: false, error: 'Name and panoramaUrl are required.' });
    }

    const customPlace = {
      id: `user-${Date.now()}`,
      name,
      city: city || 'Custom Location',
      state: '',
      country: country || 'Custom Horizon',
      category: 'User 360 Panorama',
      source: 'user-uploaded',
      latitude: parseFloat(latitude) || 0,
      longitude: parseFloat(longitude) || 0,
      defaultHeading: 180,
      defaultPitch: 0,
      openingTime: 'Private',
      closingTime: 'Private',
      recommendedDuration: 30,
      coverImage: panoramaUrl,
      description: description || `Custom user-loaded 360° panoramic virtual space: ${name}.`,
      audioNarrative: `You are viewing custom 360 panoramic space ${name}. Use mouse or touch to look around and explore.`,
      facts: [
        'Custom equirectangular projection loaded into Three.js WebGL engine.',
        `Rendered with 360° spherical texture mapping.`
      ],
      nodes: [
        {
          id: 'custom-node-1',
          name: 'Custom 360 Viewpoint',
          panoramaUrl,
          heading: 180,
          hotspots: [
            {
              id: 'hs-custom-center',
              yaw: 180,
              pitch: 0,
              title: name,
              description: description || 'Custom 360 view center anchor.',
              icon: 'camera'
            }
          ]
        }
      ]
    };

    res.json({ success: true, place: customPlace });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Fallback all other routes to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🌐 OmniSphere 360 Virtual View Server running at http://localhost:${PORT}`);
});
