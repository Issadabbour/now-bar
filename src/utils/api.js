import axios from 'axios';

// API Keys - Replace with your own from:
// News API: https://newsapi.org
// Weather API: https://openweathermap.org/api

const NEWS_API_KEY = 'YOUR_NEWS_API_KEY';
const WEATHER_API_KEY = 'YOUR_WEATHER_API_KEY';

const newsAPI = axios.create({
  baseURL: 'https://newsapi.org/v2',
});

const weatherAPI = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

// Get top headlines
export const getTopHeadlines = async (country = 'us') => {
  try {
    const response = await newsAPI.get('/top-headlines', {
      params: {
        country,
        apiKey: NEWS_API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

// Get weather by coordinates
export const getWeatherByCoordinates = async (lat, lon) => {
  try {
    const response = await weatherAPI.get('/weather', {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
};

// Get weather by city name
export const getWeatherByCity = async (city) => {
  try {
    const response = await weatherAPI.get('/weather', {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
};