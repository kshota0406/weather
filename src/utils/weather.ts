import { WeatherResponse, WeatherData, WeatherForecastItem, ForecastDay } from '../types/weather';

export const formatDateTime = (timestamp: number | string): string => {
  const date = typeof timestamp === 'number' 
    ? new Date(timestamp * 1000)
    : new Date(timestamp);

  return new Intl.DateTimeFormat('ja-JP', {
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
  }).format(date);
};

export const convertResponseToWeatherData = (response: WeatherResponse): WeatherData => {
  const currentWeather = response.list[0];

  return {
    current: {
      temp: Math.round(currentWeather.main.temp),
      feels_like: Math.round(currentWeather.main.feels_like),
      humidity: currentWeather.main.humidity,
      pressure: currentWeather.main.pressure,
      wind_speed: currentWeather.wind.speed,
      weather: currentWeather.weather,
      visibility: currentWeather.visibility,
    },
    daily: response.list,
  };
};

export const convertToForecastDays = (items: WeatherForecastItem[]): ForecastDay[] => {
  // 3時間ごとのデータから、日付ごとの最高気温と最低気温を計算
  const dailyData = items.reduce((acc, item) => {
    // dt_txtがない場合はdtから日付を生成
    const dateStr = item.dt_txt 
      ? item.dt_txt.split(' ')[0]
      : new Date(item.dt * 1000).toISOString().split('T')[0];

    if (!acc[dateStr]) {
      acc[dateStr] = {
        temps: [],
        weather: item.weather[0],
        date: formatDateTime(item.dt_txt || item.dt),
      };
    }
    acc[dateStr].temps.push(item.main.temp);
    return acc;
  }, {} as Record<string, { temps: number[]; weather: typeof items[0]['weather'][0]; date: string }>);

  return Object.values(dailyData).map(({ temps, weather, date }) => ({
    date,
    weather: weather.main,
    maxTemp: Math.round(Math.max(...temps)),
    minTemp: Math.round(Math.min(...temps)),
    icon: weather.icon,
  })).slice(0, 7); // 7日分のデータのみ返す
}; 