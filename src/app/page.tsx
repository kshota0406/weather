'use client'
import { useState, useEffect } from "react";
import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { WeatherOverlay } from '../components/WeatherOverlay';
import { WeatherData } from '../types/weather';
import dummyWeatherData from '../data/weather.json';

const API_KEY = 'YOUR_OPENWEATHER_API_KEY'; // ダミーのAPIキー
const DEFAULT_LAT = 35.6895; // 東京の緯度
const DEFAULT_LON = 139.6917; // 東京の経度

async function fetchWeatherData(lat: number, lon: number): Promise<WeatherData> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&lang=ja&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Weather data fetch failed');
    }

    const data = await response.json();
    return {
      current: {
        temp: Math.round(data.current.temp),
        feels_like: Math.round(data.current.feels_like),
        temp_min: Math.round(data.current.temp_min || data.daily[0].temp.min),
        temp_max: Math.round(data.current.temp_max || data.daily[0].temp.max),
        humidity: data.current.humidity,
        pressure: data.current.pressure,
        wind_speed: data.current.wind_speed,
        weather: data.current.weather,
        visibility: data.current.visibility,
      },
      daily: data.daily.map((day: {
        dt: number;
        temp: {
          day: number;
          min: number;
          max: number;
          night: number;
          eve: number;
          morn: number;
        };
        feels_like: {
          day: number;
          night: number;
          eve: number;
          morn: number;
        };
        pressure: number;
        humidity: number;
        weather: Array<{
          id: number;
          main: string;
          description: string;
          icon: string;
        }>;
        wind_speed: number;
        visibility?: number;
      }) => ({
        dt: day.dt,
        temp: {
          day: Math.round(day.temp.day),
          min: Math.round(day.temp.min),
          max: Math.round(day.temp.max),
          night: Math.round(day.temp.night),
          eve: Math.round(day.temp.eve),
          morn: Math.round(day.temp.morn),
        },
        feels_like: {
          day: Math.round(day.feels_like.day),
          night: Math.round(day.feels_like.night),
          eve: Math.round(day.feels_like.eve),
          morn: Math.round(day.feels_like.morn),
        },
        pressure: day.pressure,
        humidity: day.humidity,
        weather: day.weather,
        wind_speed: day.wind_speed,
        visibility: day.visibility || 10000,
      })),
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return dummyWeatherData as WeatherData; // エラー時はダミーデータを返す
  }
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData>(dummyWeatherData as WeatherData);
  const [showWeather, setShowWeather] = useState(true);

  useEffect(() => {
    const loadWeatherData = async () => {
      const data = await fetchWeatherData(DEFAULT_LAT, DEFAULT_LON);
      setWeather(data);
    };

    loadWeatherData();
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* ここに地図を表示する予定 */}

      {!showWeather && (
        <motion.div
          className="absolute bottom-4 right-4 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <IconButton
            onClick={() => setShowWeather(true)}
            sx={{
              backgroundColor: 'white',
              boxShadow: 2,
              '&:hover': {
                backgroundColor: 'white',
              },
            }}
          >
            <Add />
          </IconButton>
        </motion.div>
      )}

      {showWeather && (
        <WeatherOverlay
          city="東京"
          weather={weather}
          onClose={() => setShowWeather(false)}
        />
      )}
    </div>
  );
}
