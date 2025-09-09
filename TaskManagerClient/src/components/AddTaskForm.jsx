import React, { useState } from 'react';
import { Box, TextField, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Валідація
    if (!title.trim()) {
      setError('Назва задачі обов`язкова');
      return;
    }

    // Виклик функції додавання
    onAdd({
      title: title.trim(),
      description: description.trim()
    });

    // Очищення форми
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Назва завдання"
          variant="outlined"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError('');
          }}
          error={!!error}
          helperText={error}
          placeholder="Наприклад: Купити продукти"
        />
        
        <TextField
          fullWidth
          label="Опис (не обов'язково)"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={2}
          placeholder="Додаткова інформація про завдання"
        />
        
        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          sx={{ alignSelf: 'flex-start' }}
        >
          Додати завдання
        </Button>
      </Stack>
    </Box>
  );
}

export default AddTaskForm;