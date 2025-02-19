import { TextField, IconButton, CircularProgress } from '@mui/material';
import { Search } from '@mui/icons-material';
import { motion } from 'framer-motion';

type SearchBarProps = {
  city: string;
  onCityChange: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
};

export const SearchBar = ({ city, onCityChange, onSearch, isLoading }: SearchBarProps) => {
  return (
    <div className="flex items-center gap-2">
      <TextField
        value={city}
        onChange={(e) => onCityChange(e.target.value)}
        placeholder="都市名を入力"
        variant="outlined"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
            borderRadius: '8px',
          },
        }}
      />
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <IconButton
          onClick={onSearch}
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : <Search />}
        </IconButton>
      </motion.div>
    </div>
  );
}; 