import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Typography,
  Box,
  Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function TaskItem({ task, onToggle, onDelete }) {
  const handleToggle = () => {
    onToggle(task.id, task);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  // Форматирование даты
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton 
          edge="end" 
          aria-label="удалить" 
          onClick={handleDelete}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      }
      sx={{
        mb: 1,
        backgroundColor: task.isCompleted ? '#f5f5f5' : 'white',
        borderRadius: 1,
        border: '1px solid #e0e0e0',
        '&:hover': {
          backgroundColor: task.isCompleted ? '#eeeeee' : '#fafafa',
        }
      }}
    >
      <ListItemButton role={undefined} onClick={handleToggle} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={task.isCompleted}
            tabIndex={-1}
            disableRipple
            color="primary"
          />
        </ListItemIcon>
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  textDecoration: task.isCompleted ? 'line-through' : 'none',
                  color: task.isCompleted ? 'text.secondary' : 'text.primary',
                }}
              >
                {task.title}
              </Typography>
              {task.isCompleted && (
                <Chip 
                  label="Выполнено" 
                  size="small" 
                  color="success" 
                  variant="outlined"
                />
              )}
            </Box>
          }
          secondary={
            <>
              {task.description && (
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: 'block',
                    textDecoration: task.isCompleted ? 'line-through' : 'none',
                    mt: 0.5
                  }}
                >
                  {task.description}
                </Typography>
              )}
              <Typography
                component="span"
                variant="caption"
                color="text.disabled"
                sx={{ display: 'block', mt: 0.5 }}
              >
                Создано: {formatDate(task.createdAt)}
                {task.completedAt && ` • Выполнено: ${formatDate(task.completedAt)}`}
              </Typography>
            </>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}

export default TaskItem;