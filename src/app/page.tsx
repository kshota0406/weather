'use client'
import { useState } from "react";
import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { SearchBar } from '../components/SearchBar';
import { WeatherOverlay } from '../components/WeatherOverlay';
import { WeatherData } from '../types/weather';

// ダミーの天気データ
const dummyWeatherData: WeatherData = {
  current: {
    temp: 23,
    feels_like: 21,
    temp_min: 15,
    temp_max: 23,
    humidity: 65,
    pressure: 1013,
    wind_speed: 5,
    weather: [{ id: 800, main: "Clear", description: "晴れ", icon: "01d" }],
    visibility: 10000,
  },
  daily: [
    {
      dt: 1708003200,
      temp: {
        day: 23,
        min: 15,
        max: 23,
        night: 17,
        eve: 21,
        morn: 16
      },
      feels_like: {
        day: 21,
        night: 16,
        eve: 20,
        morn: 15
      },
      pressure: 1013,
      humidity: 65,
      weather: [{ id: 800, main: "Clear", description: "晴れ", icon: "01d" }],
      wind_speed: 5,
      visibility: 10000
    },
    {
      dt: 1708089600,
      temp: {
        day: 22,
        min: 14,
        max: 22,
        night: 16,
        eve: 20,
        morn: 15
      },
      feels_like: {
        day: 20,
        night: 15,
        eve: 19,
        morn: 14
      },
      pressure: 1012,
      humidity: 70,
      weather: [{ id: 802, main: "Clouds", description: "曇り", icon: "02d" }],
      wind_speed: 4,
      visibility: 10000
    },
    {
      dt: 1708176000,
      temp: {
        day: 21,
        min: 13,
        max: 21,
        night: 15,
        eve: 19,
        morn: 14
      },
      feels_like: {
        day: 19,
        night: 14,
        eve: 18,
        morn: 13
      },
      pressure: 1010,
      humidity: 75,
      weather: [{ id: 501, main: "Rain", description: "雨", icon: "10d" }],
      wind_speed: 6,
      visibility: 8000
    },
    {
      dt: 1708262400,
      temp: {
        day: 24,
        min: 16,
        max: 24,
        night: 18,
        eve: 22,
        morn: 17
      },
      feels_like: {
        day: 22,
        night: 17,
        eve: 21,
        morn: 16
      },
      pressure: 1015,
      humidity: 60,
      weather: [{ id: 800, main: "Clear", description: "晴れ", icon: "01d" }],
      wind_speed: 3,
      visibility: 10000
    },
    {
      dt: 1708348800,
      temp: {
        day: 25,
        min: 17,
        max: 25,
        night: 19,
        eve: 23,
        morn: 18
      },
      feels_like: {
        day: 23,
        night: 18,
        eve: 22,
        morn: 17
      },
      pressure: 1014,
      humidity: 65,
      weather: [{ id: 802, main: "Clouds", description: "曇り", icon: "02d" }],
      wind_speed: 4,
      visibility: 10000
    },
    {
      dt: 1708435200,
      temp: {
        day: 23,
        min: 15,
        max: 23,
        night: 17,
        eve: 21,
        morn: 16
      },
      feels_like: {
        day: 21,
        night: 16,
        eve: 20,
        morn: 15
      },
      pressure: 1013,
      humidity: 65,
      weather: [{ id: 800, main: "Clear", description: "晴れ", icon: "01d" }],
      wind_speed: 5,
      visibility: 10000
    },
    {
      dt: 1708521600,
      temp: {
        day: 22,
        min: 14,
        max: 22,
        night: 16,
        eve: 20,
        morn: 15
      },
      feels_like: {
        day: 20,
        night: 15,
        eve: 19,
        morn: 14
      },
      pressure: 1011,
      humidity: 75,
      weather: [{ id: 501, main: "Rain", description: "雨", icon: "10d" }],
      wind_speed: 7,
      visibility: 7000
    },
  ],
};

export default function Home() {
  const [city, setCity] = useState("東京");
  const [weather, setWeather] = useState<WeatherData>(dummyWeatherData);
  const [isLoading, setIsLoading] = useState(false);
  const [showWeather, setShowWeather] = useState(true);

  const handleSearch = () => {
    setIsLoading(true);
    // ダミーの非同期処理
    setTimeout(() => {
      setWeather(dummyWeatherData);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* ここに地図を表示する予定 */}
      <div className="absolute top-4 left-4 z-10">
        <SearchBar
          city={city}
          onCityChange={setCity}
          onSearch={handleSearch}
          isLoading={isLoading}
        />
      </div>

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
          city={city}
          weather={weather}
          onClose={() => setShowWeather(false)}
        />
      )}
    </div>
  );
}
