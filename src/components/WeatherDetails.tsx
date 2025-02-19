import { Grid, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { WeatherComponentProps, WeatherDetailId } from '../types/weather';
import { WEATHER_DETAILS } from '../constants/weather';

interface WeatherDetailsProps extends WeatherComponentProps {
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
}

const DetailItem = ({ title, value, unit, icon, compact }: {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  compact?: boolean;
}) => (
  <motion.div whileHover={{ scale: 1.05 }}>
    <Paper
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: compact ? 1 : 2,
        textAlign: 'center',
        height: '100%',
      }}
    >
      <div className="flex flex-col items-center gap-1">
        {icon}
        <Typography variant={compact ? "caption" : "body2"} color="textSecondary">
          {title}
        </Typography>
        <Typography variant={compact ? "body1" : "h6"} component="p">
          {value}{unit}
        </Typography>
      </div>
    </Paper>
  </motion.div>
);

export const WeatherDetails = ({
  humidity,
  windSpeed,
  pressure,
  visibility,
  compact = false,
}: WeatherDetailsProps) => {
  const iconSize = compact ? 20 : 30;
  const values: Record<WeatherDetailId, number> = {
    humidity,
    wind_speed: windSpeed,
    pressure,
    visibility,
  };

  return (
    <Grid container spacing={1}>
      {WEATHER_DETAILS.map((detail) => (
        <Grid item xs={6} sm={3} key={detail.id}>
          <DetailItem
            title={detail.label}
            value={detail.valueConverter 
              ? detail.valueConverter(values[detail.id])
              : values[detail.id]}
            unit={detail.unit}
            icon={detail.icon(iconSize)}
            compact={compact}
          />
        </Grid>
      ))}
    </Grid>
  );
};