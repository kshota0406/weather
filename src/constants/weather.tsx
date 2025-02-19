import React from 'react';
import { WaterDrop, Air, Speed, Visibility } from '@mui/icons-material';
import { 
  WbSunny,
  Cloud,
  WbCloudy,
  Thunderstorm,
  BeachAccess,
  AcUnit,
  Grain,
  FilterDrama
} from '@mui/icons-material';
import { WeatherDetail } from '../types/weather';

// 天気アイコンの定義（OpenWeatherMap APIのアイコンコードに対応）
export const WEATHER_ICONS: Record<string, React.ReactNode> = {
  // 晴れ
  '01d': <WbSunny sx={{ color: '#FFB300' }} />,
  '01n': <WbSunny sx={{ color: '#FFA000' }} />,
  // 少し曇り
  '02d': <FilterDrama sx={{ color: '#64B5F6' }} />,
  '02n': <FilterDrama sx={{ color: '#42A5F5' }} />,
  // 曇り
  '03d': <WbCloudy sx={{ color: '#90A4AE' }} />,
  '03n': <WbCloudy sx={{ color: '#78909C' }} />,
  // 厚い曇り
  '04d': <Cloud sx={{ color: '#78909C' }} />,
  '04n': <Cloud sx={{ color: '#607D8B' }} />,
  // 小雨
  '09d': <BeachAccess sx={{ color: '#4FC3F7' }} />,
  '09n': <BeachAccess sx={{ color: '#29B6F6' }} />,
  // 雨
  '10d': <BeachAccess sx={{ color: '#4FC3F7' }} />,
  '10n': <BeachAccess sx={{ color: '#29B6F6' }} />,
  // 雷雨
  '11d': <Thunderstorm sx={{ color: '#7E57C2' }} />,
  '11n': <Thunderstorm sx={{ color: '#673AB7' }} />,
  // 雪
  '13d': <AcUnit sx={{ color: '#90CAF9' }} />,
  '13n': <AcUnit sx={{ color: '#64B5F6' }} />,
  // 霧
  '50d': <Grain sx={{ color: '#B0BEC5' }} />,
  '50n': <Grain sx={{ color: '#90A4AE' }} />,
};

// タブの定義
export const TABS = [
  { id: 'current', label: '現在の天気' },
  { id: 'details', label: '詳細情報' },
  { id: 'forecast', label: '週間予報' },
] as const;

// 天気詳細の定義
export const WEATHER_DETAILS: WeatherDetail[] = [
  {
    id: 'humidity',
    label: '湿度',
    unit: '%',
    defaultValue: 0,
    icon: (size: number) => <WaterDrop sx={{ fontSize: size }} />,
  },
  {
    id: 'wind_speed',
    label: '風速',
    unit: 'm/s',
    defaultValue: 0,
    icon: (size: number) => <Air sx={{ fontSize: size }} />,
  },
  {
    id: 'pressure',
    label: '気圧',
    unit: 'hPa',
    defaultValue: 1013,
    icon: (size: number) => <Speed sx={{ fontSize: size }} />,
  },
  {
    id: 'visibility',
    label: '視界',
    unit: 'km',
    defaultValue: 10,
    icon: (size: number) => <Visibility sx={{ fontSize: size }} />,
    valueConverter: (value: number) => Math.round(value / 1000),
  },
];