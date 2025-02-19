import React, { useState } from 'react';
import { Box, IconButton, Paper, Collapse, Fade } from '@mui/material';
import { ExpandMore, ExpandLess, Close } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { WeatherCard } from './WeatherCard';
import { WeatherDetails } from './WeatherDetails';
import { WeatherForecast } from './WeatherForecast';
import { WeatherTabs } from './WeatherTabs';
import { WeatherData, TabType } from '../types/weather';
import { weatherOverlay, iconButtonLight } from '../styles/common';
import { convertToForecastDays } from '../utils/weather';
import { WEATHER_ICONS } from '../constants/weather';

type WeatherOverlayProps = {
  city: string;
  weather: WeatherData;
  onClose: () => void;
};

export const WeatherOverlay: React.FC<WeatherOverlayProps> = ({ city, weather, onClose }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('current');

  const forecast = convertToForecastDays(weather.daily);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'current':
        return (
          <WeatherCard
            city={city}
            temperature={weather.current.temp}
            feelsLike={weather.current.feels_like}
            description={weather.current.weather[0].description}
            icon={weather.current.weather[0].icon}
            compact
          />
        );
      case 'details':
        return (
          <WeatherDetails
            humidity={weather.current.humidity}
            windSpeed={weather.current.wind_speed}
            pressure={weather.current.pressure}
            visibility={weather.current.visibility}
            compact
          />
        );
      case 'forecast':
        return <WeatherForecast forecast={forecast} compact />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute bottom-4 right-4 w-full max-w-sm"
    >
      <Paper elevation={3} sx={weatherOverlay}>
        {/* ヘッダー */}
        <Box className="flex items-center justify-between p-2 bg-blue-500 text-white">
          <IconButton
            size="small"
            onClick={() => setExpanded(!expanded)}
            sx={iconButtonLight}
          >
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
          <div className="flex space-x-2">
            <IconButton
              size="small"
              onClick={onClose}
              sx={iconButtonLight}
            >
              <Close />
            </IconButton>
          </div>
        </Box>

        {/* 展開時のコンテンツ */}
        <Collapse in={expanded}>
          <Box className="p-3">
            <div className="mb-3">
              <Fade in={true}>
                <div>
                  {renderTabContent()}
                </div>
              </Fade>
            </div>
            <WeatherTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </Box>
        </Collapse>

        {/* 最小化時の表示 */}
        <Collapse in={!expanded}>
          <Box className="p-2">
            <div className="flex items-center justify-between">
              <span className="font-bold">{city}</span>
              <div className="flex items-center">
                <div className="text-2xl mr-2 flex items-center">
                  {weather.current.weather[0].icon && 
                    weather.current.weather[0].icon in WEATHER_ICONS && 
                    WEATHER_ICONS[weather.current.weather[0].icon]}
                </div>
                <span className="text-xl">{weather.current.temp}°C</span>
              </div>
            </div>
          </Box>
        </Collapse>
      </Paper>
    </motion.div>
  );
}; 