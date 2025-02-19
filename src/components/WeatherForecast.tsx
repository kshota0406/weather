import { Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { ForecastDay, WeatherComponentProps } from '../types/weather';
import { WEATHER_ICONS } from '../constants/weather';
import { TemperatureChart } from './TemperatureChart';

interface WeatherForecastProps extends WeatherComponentProps {
  forecast: ForecastDay[];
}

export const WeatherForecast = ({ forecast, compact = false }: WeatherForecastProps) => {
  return (
    <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}>
      <CardContent sx={{ padding: compact ? '8px !important' : 2 }}>
        {!compact && (
          <Typography variant="h5" component="h3" className="mb-4">
            週間天気予報
          </Typography>
        )}
        <div className="overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            {forecast.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`flex flex-col items-center ${compact ? "w-16" : "w-24"}`}
              >
                <Typography variant={compact ? "caption" : "body2"} className="mb-1 whitespace-nowrap">
                  {day.date}
                </Typography>
                <div className={`flex items-center justify-center ${compact ? "text-2xl" : "text-4xl"}`}>
                  {WEATHER_ICONS[day.icon]}
                </div>
                <Typography variant={compact ? "body2" : "h6"} component="p" className="mt-1">
                  {day.maxTemp}°C
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {day.minTemp}°C
                </Typography>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-4">
          <TemperatureChart forecast={forecast} compact={compact} />
        </div>
      </CardContent>
    </Card>
  );
}; 