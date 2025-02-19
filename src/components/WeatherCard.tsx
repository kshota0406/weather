import { Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { WeatherComponentProps } from '../types/weather';
import { WEATHER_ICONS } from '../constants/weather';

interface WeatherCardProps extends WeatherComponentProps {
  city: string;
  temperature: number;
  feelsLike: number;
  description: string;
  icon: string;
}

export const WeatherCard = ({
  city,
  temperature,
  feelsLike,
  description,
  icon,
  compact = false,
}: WeatherCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}>
        <CardContent sx={{ padding: compact ? '8px !important' : 2 }}>
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1">
              {!compact && (
                <Typography variant="h4" component="h2" className="mb-2">
                  {city}
                </Typography>
              )}
              <motion.div
                key={temperature}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col"
              >
                <Typography
                  variant={compact ? "h5" : "h2"}
                  component="p"
                  className="mb-1"
                >
                  {temperature}°C
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  体感温度: {feelsLike}°C
                </Typography>
                <Typography 
                  variant={compact ? "body2" : "h6"}
                  className="mt-1"
                >
                  {description}
                </Typography>
              </motion.div>
            </div>
            <motion.div
              className={`flex items-center justify-center ${compact ? "text-4xl" : "text-6xl"}`}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {WEATHER_ICONS[icon]}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}; 