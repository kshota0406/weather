export type WeatherType = 'Clear' | 'Clouds' | 'Rain' | 'few clouds';

export type WeatherDetailId = 'humidity' | 'wind_speed' | 'pressure' | 'visibility';

export type WeatherDetail = {
  id: WeatherDetailId;
  label: string;
  unit: string;
  defaultValue: number;
  icon: (size: number) => React.ReactNode;
  valueConverter?: (value: number) => number;
};

export type WeatherResponse = {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherForecastItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

export type WeatherForecastItem = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: WeatherType;
    description: string;
    icon: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  pop: number;
  dt_txt: string;
};

export type WeatherData = {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    wind_speed: number;
    weather: Array<{
      id: number;
      main: WeatherType;
      description: string;
      icon: string;
    }>;
    visibility: number;
  };
  daily: WeatherForecastItem[];
};

export type ForecastDay = {
  date: string;
  weather: WeatherType;
  maxTemp: number;
  minTemp: number;
  icon: string;
};

export type TabType = 'current' | 'details' | 'forecast';

export interface WeatherComponentProps {
  compact?: boolean;
} 