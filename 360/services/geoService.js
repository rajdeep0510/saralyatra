const axios = require('axios');

class GeoService {
  /**
   * Geocode a place query via OpenStreetMap Nominatim API
   */
  static async geocode(query) {
    try {
      const url = `https://nominatim.openstreetmap.org/search`;
      const response = await axios.get(url, {
        params: {
          q: query,
          format: 'json',
          addressdetails: 1,
          limit: 8
        },
        headers: {
          'User-Agent': 'OmniSphere360/1.0 (virtual-tour-educational-app)',
          'Accept-Language': 'en-US,en;q=0.9'
        },
        timeout: 7000
      });

      if (!response.data || response.data.length === 0) {
        return [];
      }

      return response.data.map(item => {
        const address = item.address || {};
        const city = address.city || address.town || address.village || address.state_district || address.county || '';
        const state = address.state || '';
        const country = address.country || '';

        return {
          placeId: item.place_id,
          osmId: item.osm_id,
          name: item.name || item.display_name.split(',')[0],
          displayName: item.display_name,
          city,
          state,
          country,
          type: item.type || item.category || 'landmark',
          latitude: parseFloat(item.lat),
          longitude: parseFloat(item.lon),
          boundingBox: item.boundingbox ? item.boundingbox.map(Number) : null
        };
      });
    } catch (err) {
      console.error('Geocoding error:', err.message);
      return [];
    }
  }

  /**
   * Fetch Wikipedia summary, narrative & cover image for a place
   */
  static async getWikiSummary(query) {
    try {
      // Step 1: Search Wikipedia for best match article
      const searchUrl = 'https://en.wikipedia.org/w/api.php';
      const searchRes = await axios.get(searchUrl, {
        params: {
          action: 'query',
          list: 'search',
          srsearch: query,
          format: 'json',
          srlimit: 1
        },
        headers: { 'User-Agent': 'OmniSphere360/1.0' },
        timeout: 6000
      });

      const searchResults = searchRes.data?.query?.search;
      if (!searchResults || searchResults.length === 0) {
        return null;
      }

      const bestTitle = searchResults[0].title;

      // Step 2: Fetch REST summary for the article
      const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(bestTitle)}`;
      const summaryRes = await axios.get(summaryUrl, {
        headers: { 'User-Agent': 'OmniSphere360/1.0' },
        timeout: 6000
      });

      const data = summaryRes.data;
      return {
        title: data.title,
        description: data.description || '',
        extract: data.extract || '',
        thumbnail: data.thumbnail?.source || data.originalimage?.source || null,
        coordinates: data.coordinates ? { lat: data.coordinates.lat, lon: data.coordinates.lon } : null,
        pageUrl: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(bestTitle)}`
      };
    } catch (err) {
      console.error('Wiki summary error:', err.message);
      return null;
    }
  }

  /**
   * Fetch live weather, daylight, and timezone info for coordinates
   */
  static async getWeather(lat, lng) {
    try {
      const url = 'https://api.open-meteo.com/v1/forecast';
      const response = await axios.get(url, {
        params: {
          latitude: lat,
          longitude: lng,
          current_weather: true,
          daily: 'temperature_2m_max,temperature_2m_min,sunrise,sunset',
          timezone: 'auto'
        },
        timeout: 5000
      });

      const cur = response.data?.current_weather;
      const daily = response.data?.daily;
      if (!cur) return null;

      const weatherCodes = {
        0: 'Clear sky ☀️',
        1: 'Mainly clear 🌤️',
        2: 'Partly cloudy ⛅',
        3: 'Overcast ☁️',
        45: 'Foggy 🌫️',
        48: 'Depositing rime fog 🌫️',
        51: 'Light drizzle 🌦️',
        61: 'Slight rain 🌧️',
        63: 'Moderate rain 🌧️',
        65: 'Heavy rain 🌧️',
        71: 'Slight snow ❄️',
        80: 'Rain showers 🌦️',
        95: 'Thunderstorm ⛈️'
      };

      return {
        temperature: `${cur.temperature}°C`,
        windspeed: `${cur.windspeed} km/h`,
        isDay: cur.is_day === 1,
        condition: weatherCodes[cur.weathercode] || 'Clear ☀️',
        timezone: response.data.timezone,
        sunrise: daily?.sunrise ? daily.sunrise[0].split('T')[1] : null,
        sunset: daily?.sunset ? daily.sunset[0].split('T')[1] : null
      };
    } catch (err) {
      console.warn('Weather fetch error (non-fatal):', err.message);
      return null;
    }
  }
}

module.exports = GeoService;
