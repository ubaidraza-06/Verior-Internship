import React from 'react';
import { 
  Paper, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormGroup, 
  FormControlLabel, 
  Checkbox, 
  Button,
  Box,
  Divider
} from '@mui/material';
import { Tune as TuneIcon } from '@mui/icons-material';

const FilterControls = ({ genres = [] }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'semibold' }}>
          <TuneIcon />
          Filters
        </Typography>
        <Button 
          size="small" 
          color="primary"
          sx={{ textTransform: 'none' }}
        >
          Clear All
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Sort By */}
        <FormControl fullWidth size="small">
          <InputLabel>Sort By</InputLabel>
          <Select
            defaultValue="popularity.desc"
            label="Sort By"
          >
            <MenuItem value="popularity.desc">Popularity (High to Low)</MenuItem>
            <MenuItem value="popularity.asc">Popularity (Low to High)</MenuItem>
            <MenuItem value="vote_average.desc">Rating (High to Low)</MenuItem>
            <MenuItem value="vote_average.asc">Rating (Low to High)</MenuItem>
            <MenuItem value="release_date.desc">Release Date (Newest)</MenuItem>
            <MenuItem value="release_date.asc">Release Date (Oldest)</MenuItem>
            <MenuItem value="title.asc">Title (A-Z)</MenuItem>
            <MenuItem value="title.desc">Title (Z-A)</MenuItem>
          </Select>
        </FormControl>

        {/* Year Filter */}
        <FormControl fullWidth size="small">
          <InputLabel>Release Year</InputLabel>
          <Select
            defaultValue=""
            label="Release Year"
          >
            <MenuItem value="">All Years</MenuItem>
            {years.map(year => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider />

        {/* Genre Filter */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'medium' }}>
            Genres
          </Typography>
          <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
            <FormGroup>
              {genres.map(genre => (
                <FormControlLabel
                  key={genre.id}
                  control={<Checkbox size="small" />}
                  label={genre.name}
                  sx={{ 
                    '& .MuiFormControlLabel-label': { 
                      fontSize: '0.875rem' 
                    } 
                  }}
                />
              ))}
            </FormGroup>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default FilterControls;