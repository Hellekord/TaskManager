import React, { useState } from 'react';
import { Box, TextField, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Валидация
    if (!title.trim()) {
      setError('Название задачи обязательно!');
      return;
    }

    // Вызов функции добавления
    onAdd({
      title: title.trim(),
      description: description.trim()
    });

    // Очистка формы
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Название задачи"
          variant="outlined"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError('');
          }}
          error={!!error}
          helperText={error}
          placeholder="Например: Купить продукты"
        />
        
        <TextField
          fullWidth
          label="Описание (необязательно)"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={2}
          placeholder="Дополнительная информация о задаче"
        />
        
        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          sx={{ alignSelf: 'flex-start' }}
        >
          Добавить задачу
        </Button>
      </Stack>
    </Box>
  );
}

export default AddTaskForm;