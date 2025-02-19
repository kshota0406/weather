import { SxProps, Theme } from '@mui/material';

export const glassEffect: SxProps<Theme> = {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
};

export const glassCard: SxProps<Theme> = {
  ...glassEffect,
  overflow: 'hidden',
};

export const weatherOverlay: SxProps<Theme> = {
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  overflow: 'hidden',
};

export const iconButtonLight: SxProps<Theme> = {
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
};

export const compactPadding: SxProps<Theme> = {
  padding: 1,
}; 