import React from 'react';
import { ToggleButton, ToggleButtonGroup, Box, Typography } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function FilterButtons({ currentFilter, onFilterChange }) {
  const handleChange = (event, newFilter) => {
    if (newFilter !== null) {
      onFilterChange(newFilter);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant="h6" component="div">
        Фільтр:
      </Typography>
      <ToggleButtonGroup
        value={currentFilter}
        exclusive
        onChange={handleChange}
        aria-label="фільтр завдань"
      >
        <ToggleButton value="all" aria-label="всі завдання">
          <ListIcon sx={{ mr: 1 }} />
          Всі
        </ToggleButton>
        <ToggleButton value="active" aria-label="активні завдання">
          <RadioButtonUncheckedIcon sx={{ mr: 1 }} />
          Активні
        </ToggleButton>
        <ToggleButton value="completed" aria-label="завершені завдання">
          <CheckCircleIcon sx={{ mr: 1 }} />
          Завершені
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default FilterButtons;