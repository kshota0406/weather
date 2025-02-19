import { ReactNode } from 'react';

// 天気の種類の定義
export type WeatherType = 
  | 'Clear'     // 晴れ
  | 'Clouds'    // 曇り
  | 'Rain'      // 雨
  | 'Drizzle'   // 霧雨
  | 'Thunderstorm' // 雷雨
  | 'Snow'      // 雪
  | 'Mist'      // 靄
  | 'Fog'       // 霧
  | 'Haze'      // もや
  | 'Dust'      // 砂塵
  | 'Smoke'     // 煙
  | 'Sand'      // 砂
  | 'Ash'       // 火山灰
  | 'Squall'    // スコール
  | 'Tornado';  // 竜巻

// 天気詳細の種類
export type WeatherDetailId = 'humidity' | 'wind_speed' | 'pressure' | 'visibility';

// 天気詳細の定義
export type WeatherDetail = {
  id: WeatherDetailId;
  label: string;
  unit: string;
  defaultValue: number;
  icon: (size: number) => ReactNode;
  valueConverter?: (value: number) => number;
};

// 天気情報の定義
export type WeatherInfo = {
  id: number;
  main: WeatherType;
  description: string;
  icon: string;
};

// 気温情報の定義
export type Temperature = {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
};

// 体感温度の定義
export type FeelsLike = {
  day: number;
  night: number;
  eve: number;
  morn: number;
};

// 日別天気情報の定義
export type DailyWeather = {
  dt: number;
  temp: Temperature;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  weather: WeatherInfo[];
  wind_speed: number;
  visibility: number;
};

// 現在の天気情報の定義
export type CurrentWeather = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  weather: WeatherInfo[];
  visibility: number;
};

// 天気データの定義
export type WeatherData = {
  current: CurrentWeather;
  daily: DailyWeather[];
};

// 予報日の定義
export type ForecastDay = {
  date: string;
  weather: WeatherType;
  maxTemp: number;
  minTemp: number;
  icon: string;
};

// タブの種類の定義
export type TabType = 'current' | 'details' | 'forecast';

// 共通のコンポーネントプロパティ
export interface WeatherComponentProps {
  compact?: boolean;
} 