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

  // Завантаження завдань
  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await taskService.getTasks(filter);
      setTasks(data);
    } catch (err) {
      setError('Помилка під час завантаження завдань');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [filter]);

  // Додавання нового завдання
  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setSuccess('Завдання успішно додано!');
      loadTasks();
    } catch (err) {
      setError('Помилка при додаванні завдання');
      console.error(err);
    }
  };

  // Оновлення статусу завдання
  const handleToggleTask = async (id, task) => {
    try {
      await taskService.updateTask(id, {
        ...task,
        isCompleted: !task.isCompleted
      });
      setSuccess('Завдання оновлено!');
      loadTasks();
    } catch (err) {
      setError('Помилка під час оновлення завдання');
      console.error(err);
    }
  };

  // Видалення завдання
  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setSuccess('Завдання видалено!');
      loadTasks();
    } catch (err) {
      setError('Помилка під час видалення завдання');
      console.error(err);
    }
  };

  // Зміна фільтра
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
            📋 Менеджер завдань
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
                  ? 'Немає завершених завдань' 
                  : filter === 'active'
                  ? 'Немає активних завдань'
                  : 'Список завдань порожній'}
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