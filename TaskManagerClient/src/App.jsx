import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Alert, Snackbar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import FilterButtons from './components/FilterButtons';
import taskService from './services/api';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Загрузка задач
  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await taskService.getTasks(filter);
      setTasks(data);
    } catch (err) {
      setError('Ошибка при загрузке задач');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [filter]);

  // Добавление новой задачи
  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setSuccess('Задача успешно добавлена!');
      loadTasks();
    } catch (err) {
      setError('Ошибка при добавлении задачи');
      console.error(err);
    }
  };

  // Обновление статуса задачи
  const handleToggleTask = async (id, task) => {
    try {
      await taskService.updateTask(id, {
        ...task,
        isCompleted: !task.isCompleted
      });
      setSuccess('Задача обновлена!');
      loadTasks();
    } catch (err) {
      setError('Ошибка при обновлении задачи');
      console.error(err);
    }
  };

  // Удаление задачи
  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setSuccess('Задача удалена!');
      loadTasks();
    } catch (err) {
      setError('Ошибка при удалении задачи');
      console.error(err);
    }
  };

  // Изменение фильтра
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleCloseError = () => setError('');
  const handleCloseSuccess = () => setSuccess('');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
            📋 Менеджер задач
          </Typography>
          
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <AddTaskForm onAdd={handleAddTask} />
          </Paper>

          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            <FilterButtons 
              currentFilter={filter} 
              onFilterChange={handleFilterChange} 
            />
          </Paper>

          <Paper elevation={2} sx={{ p: 2 }}>
            {loading ? (
              <Typography align="center">Загрузка...</Typography>
            ) : tasks.length === 0 ? (
              <Typography align="center" color="textSecondary">
                {filter === 'completed' 
                  ? 'Нет завершенных задач' 
                  : filter === 'active'
                  ? 'Нет активных задач'
                  : 'Список задач пуст'}
              </Typography>
            ) : (
              <TaskList 
                tasks={tasks} 
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
              />
            )}
          </Paper>
        </Box>

        <Snackbar 
          open={!!error} 
          autoHideDuration={4000} 
          onClose={handleCloseError}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>

        <Snackbar 
          open={!!success} 
          autoHideDuration={3000} 
          onClose={handleCloseSuccess}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
            {success}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default App;