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
    humidity: 65,
    pressure: 1013,
    wind_speed: 5,
    weather: [{ id: 800, main: "Clear", description: "晴れ", icon: "01d" }],
    visibility: 10000,
  },
  daily: [
    { 
      dt: 1708003200,
      main: { 
        temp: 23,
        feels_like: 21,
        temp_min: 15,
        temp_max: 23,
        pressure: 1013,
        humidity: 65
      },
      weather: [{ id: 800, main: "Clear", description: "晴れ", icon: "01d" }],
      wind: { speed: 5, deg: 180 },
      visibility: 10000,
      clouds: { all: 0 },
      pop: 0,
      dt_txt: "2024-02-19 12:00:00"
    },
    { 
      dt: 1708089600,
      main: { 
        temp: 22,
        feels_like: 20,
        temp_min: 14,
        temp_max: 22,
        pressure: 1012,
        humidity: 70
      },
      weather: [{ id: 802, main: "Clouds", description: "曇り", icon: "02d" }],
      wind: { speed: 4, deg: 190 },
      visibility: 10000,
      clouds: { all: 40 },
      pop: 0.1,
      dt_txt: "2024-02-20 12:00:00"
    },
    { 
      dt: 1708176000,
      main: { 
        temp: 21,
        feels_like: 19,
        temp_min: 13,
        temp_max: 21,
        pressure: 1010,
        humidity: 75
      },
      weather: [{ id: 501, main: "Rain", description: "雨", icon: "10d" }],
      wind: { speed: 6, deg: 200 },
      visibility: 8000,
      clouds: { all: 80 },
      pop: 0.6,
      dt_txt: "2024-02-21 12:00:00"
    },
    { 
      dt: 1708262400,
      main: { 
        temp: 24,
        feels_like: 22,
        temp_min: 16,
        temp_max: 24,
        pressure: 1015,
        humidity: 60
      },
      weather: [{ id: 800, main: "Clear", description: "晴れ", icon: "01d" }],
      wind: { speed: 3, deg: 170 },
      visibility: 10000,
      clouds: { all: 0 },
      pop: 0,
      dt_txt: "2024-02-22 12:00:00"
    },
    { 
      dt: 1708348800,
      main: { 
        temp: 25,
        feels_like: 23,
        temp_min: 17,
        temp_max: 25,
        pressure: 1014,
        humidity: 65
      },
      weather: [{ id: 802, main: "Clouds", description: "曇り", icon: "02d" }],
      wind: { speed: 4, deg: 180 },
      visibility: 10000,
      clouds: { all: 30 },
      pop: 0.2,
      dt_txt: "2024-02-23 12:00:00"
    },
    { 
      dt: 1708435200,
      main: { 
        temp: 23,
        feels_like: 21,
        temp_min: 15,
        temp_max: 23,
        pressure: 1013,
        humidity: 65
      },
      weather: [{ id: 800, main: "Clear", description: "晴れ", icon: "01d" }],
      wind: { speed: 5, deg: 190 },
      visibility: 10000,
      clouds: { all: 0 },
      pop: 0,
      dt_txt: "2024-02-24 12:00:00"
    },
    { 
      dt: 1708521600,
      main: { 
        temp: 22,
        feels_like: 20,
        temp_min: 14,
        temp_max: 22,
        pressure: 1011,
        humidity: 75
      },
      weather: [{ id: 501, main: "Rain", description: "雨", icon: "10d" }],
      wind: { speed: 7, deg: 200 },
      visibility: 7000,
      clouds: { all: 90 },
      pop: 0.7,
      dt_txt: "2024-02-25 12:00:00"
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
