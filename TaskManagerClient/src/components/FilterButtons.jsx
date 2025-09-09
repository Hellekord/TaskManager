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
        Фильтр:
      </Typography>
      <ToggleButtonGroup
        value={currentFilter}
        exclusive
        onChange={handleChange}
        aria-label="фильтр задач"
      >
        <ToggleButton value="all" aria-label="все задачи">
          <ListIcon sx={{ mr: 1 }} />
          Все
        </ToggleButton>
        <ToggleButton value="active" aria-label="активные задачи">
          <RadioButtonUncheckedIcon sx={{ mr: 1 }} />
          Активные
        </ToggleButton>
        <ToggleButton value="completed" aria-label="завершенные задачи">
          <CheckCircleIcon sx={{ mr: 1 }} />
          Завершенные
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default FilterButtons;