const axios = require('axios');
const curatedPlaces = require('../data/curatedPlaces');

// High-fidelity fallback equirectangular 360° sphere textures categorized by environment
const DEFAULT_360_PANORAMAS = {
  heritage: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/textures/2294472375_24a3b8ef46_o.jpg',
  nature: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/equirectangular/san_giuseppe_bridge_4k.jpg',
  temple: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Brihadisvara_Temple_Thanjavur_360.jpg',
  mountain: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/equirectangular/royal_esplanade_1k.hdr',
  city: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Times_Square_360_Panorama_NYC.jpg',
  default: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/textures/2294472375_24a3b8ef46_o.jpg'
};

class PanoramaService {
  /**
   * Find matching curated place by ID or query string
   */
  static findCuratedPlace(queryOrId) {
    if (!queryOrId) return null;
    const q = queryOrId.toLowerCase().trim();

    // Exact ID match
    const byId = curatedPlaces.find(p => p.id === q);
    if (byId) return byId;

    // Fuzzy name/city match
    const byName = curatedPlaces.find(p => {
      const name = p.name.toLowerCase();
      const city = p.city.toLowerCase();
      const state = (p.state || '').toLowerCase();
      const country = (p.country || '').toLowerCase();
      return name.includes(q) || q.includes(name) ||
             (city && q.includes(city)) ||
             (state && q.includes(state)) ||
             (country && q.includes(country));
    });

    return byName || null;
  }

  /**
   * Query Wikimedia Commons for equirectangular 360° panoramas
   */
  static async searchWikimedia360(query) {
    try {
      const searchTerms = [
        `"${query}" 360 panorama equirectangular`,
        `${query} 360 equirectangular`,
        `${query} spherical panorama`,
        `${query} 360 panorama`
      ];

      for (const term of searchTerms) {
        const url = 'https://commons.wikimedia.org/w/api.php';
        const response = await axios.get(url, {
          params: {
            action: 'query',
            generator: 'search',
            gsrsearch: term,
            gsrnamespace: 6, // File namespace
            gsrlimit: 6,
            prop: 'imageinfo',
            iiprop: 'url|size|extmetadata|dimensions',
            format: 'json'
          },
          headers: { 'User-Agent': 'OmniSphere360/1.0' },
          timeout: 6000
        });

        const pages = response.data?.query?.pages;
        if (!pages) continue;

        const results = [];
        for (const key of Object.keys(pages)) {
          const page = pages[key];
          const info = page.imageinfo?.[0];
          if (!info || !info.url) continue;

          const width = info.width || 0;
          const height = info.height || 0;
          const aspectRatio = height > 0 ? (width / height) : 0;
          const isJpg = info.url.endsWith('.jpg') || info.url.endsWith('.jpeg') || info.url.endsWith('.png');

          // Equirectangular images typically have a 2:1 aspect ratio (or between 1.8 and 2.2)
          const isEquirectangular = (aspectRatio >= 1.8 && aspectRatio <= 2.2) ||
                                    page.title.toLowerCase().includes('360') ||
                                    page.title.toLowerCase().includes('equirectangular') ||
                                    page.title.toLowerCase().includes('pano');

          if (isJpg && (isEquirectangular || width > 2000)) {
            results.push({
              title: page.title.replace(/^File:/, '').replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
              url: info.url,
              thumbUrl: info.thumburl || info.url,
              width,
              height,
              aspectRatio
            });
          }
        }

        if (results.length > 0) {
          return results;
        }
      }

      return [];
    } catch (err) {
      console.warn('Wikimedia Commons 360 search warning:', err.message);
      return [];
    }
  }

  /**
   * Resolve best 360 panorama and structure complete place object
   */
  static async resolve360View(query, geoData = null, wikiData = null) {
    // 1. Check curated database first
    const curated = this.findCuratedPlace(query);
    if (curated) {
      return {
        source: 'curated',
        ...curated
      };
    }

    // 2. Search Wikimedia Commons for real 360 panoramas of this place
    const commons360 = await this.searchWikimedia360(query);

    const lat = geoData?.latitude || wikiData?.coordinates?.lat || 0;
    const lng = geoData?.longitude || wikiData?.coordinates?.lon || 0;
    const title = wikiData?.title || geoData?.name || query;
    const city = geoData?.city || '';
    const state = geoData?.state || '';
    const country = geoData?.country || '';

    // Pick panorama
    let primaryPanoramaUrl = DEFAULT_360_PANORAMAS.default;
    let fallbackPanoramaUrl = DEFAULT_360_PANORAMAS.heritage;
    let nodeName = 'Main 360° Panoramic Vista';

    if (commons360 && commons360.length > 0) {
      primaryPanoramaUrl = commons360[0].url;
      nodeName = commons360[0].title;
    } else {
      // Pick best default based on keyword
      const qLower = query.toLowerCase();
      if (qLower.includes('temple') || qLower.includes('shrine') || qLower.includes('church') || qLower.includes('mosque')) {
        primaryPanoramaUrl = DEFAULT_360_PANORAMAS.temple;
      } else if (qLower.includes('mountain') || qLower.includes('park') || qLower.includes('river') || qLower.includes('canyon') || qLower.includes('lake')) {
        primaryPanoramaUrl = DEFAULT_360_PANORAMAS.nature;
      } else if (qLower.includes('city') || qLower.includes('square') || qLower.includes('street') || qLower.includes('tower')) {
        primaryPanoramaUrl = DEFAULT_360_PANORAMAS.city;
      }
    }

    // Generate intelligent 3D hotspots from Wikipedia & Geocoding
    const hotspots = [
      {
        id: 'hs-geo-anchor',
        yaw: 180,
        pitch: 5,
        title: title,
        description: wikiData?.description || `${title} located at coordinates ${lat.toFixed(4)}, ${lng.toFixed(4)}.`,
        icon: 'map-pin'
      },
      {
        id: 'hs-compass-north',
        yaw: 0,
        pitch: 0,
        title: 'True Geographic North',
        description: `Orientation marker pointing 0° True North from ${title}.`,
        icon: 'compass'
      }
    ];

    if (wikiData?.extract) {
      hotspots.push({
        id: 'hs-history-snippet',
        yaw: 90,
        pitch: 12,
        title: 'Historical Chronicle',
        description: wikiData.extract.substring(0, 180) + '...',
        icon: 'book-open'
      });
    }

    return {
      id: `custom-${encodeURIComponent(query.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}`,
      name: title,
      city: city || 'Global Explorer',
      state: state,
      country: country,
      category: 'Global Exploration',
      source: commons360.length > 0 ? 'wikimedia-commons-360' : 'geocoded-virtual-view',
      latitude: lat,
      longitude: lng,
      defaultHeading: 180,
      defaultPitch: 5,
      openingTime: 'Public Access',
      closingTime: 'Open 24/7',
      recommendedDuration: 45,
      coverImage: wikiData?.thumbnail || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80',
      description: wikiData?.extract || wikiData?.description || `Explore ${title} in 360-degree immersive virtual perspective with live spatial audio and interactive GPS radar map.`,
      audioNarrative: wikiData?.extract ? `You are currently viewing ${title}. ${wikiData.extract}` : `Welcome to ${title}. Explore the surrounding 360-degree panoramic environment and geographical radar view.`,
      facts: [
        `Geographic coordinates: ${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`,
        `Administrative Region: ${[city, state, country].filter(Boolean).join(', ') || 'Global'}`,
        wikiData?.description ? `Designation: ${wikiData.description}` : 'Interactive 360° WebGL Virtual Tour'
      ],
      nodes: [
        {
          id: 'node-main',
          name: nodeName,
          panoramaUrl: primaryPanoramaUrl,
          fallbackUrl: fallbackPanoramaUrl,
          heading: 180,
          hotspots
        }
      ]
    };
  }
}

module.exports = PanoramaService;
