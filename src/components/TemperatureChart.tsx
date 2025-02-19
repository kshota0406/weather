import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ForecastDay } from '../types/weather';
import { WeatherComponentProps } from '../types/weather';

interface TemperatureChartProps extends WeatherComponentProps {
  forecast: ForecastDay[];
}

export const TemperatureChart = ({ forecast, compact = false }: TemperatureChartProps) => {
  const data = forecast.map(day => ({
    date: day.date,
    最高気温: day.maxTemp,
    最低気温: day.minTemp,
  }));

  return (
    <div className={`w-full ${compact ? 'h-32' : 'h-48'}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: compact ? 10 : 12 }}
            interval={0}
          />
          <YAxis 
            tick={{ fontSize: compact ? 10 : 12 }}
            domain={['dataMin - 2', 'dataMax + 2']}
            unit="°C"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '8px',
              fontSize: compact ? 10 : 12,
            }}
          />
          <Legend 
            wrapperStyle={{ 
              fontSize: compact ? 10 : 12,
              paddingTop: '8px',
            }}
          />
          <Line
            type="monotone"
            dataKey="最高気温"
            stroke="#ff7300"
            strokeWidth={2}
            dot={{ r: compact ? 2 : 3 }}
          />
          <Line
            type="monotone"
            dataKey="最低気温"
            stroke="#0088ff"
            strokeWidth={2}
            dot={{ r: compact ? 2 : 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}; 