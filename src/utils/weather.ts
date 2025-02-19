import { DailyWeather, ForecastDay } from '../types/weather';

export const formatDateTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat('ja-JP', {
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
  }).format(date);
};

export const convertToForecastDays = (items: DailyWeather[]): ForecastDay[] => {
  return items.map(item => ({
    date: formatDateTime(item.dt),
    weather: item.weather[0].main,
    maxTemp: Math.round(item.temp.max),
    minTemp: Math.round(item.temp.min),
    icon: item.weather[0].icon,
  })).slice(0, 7); // 7日分のデータのみ返す
}; 