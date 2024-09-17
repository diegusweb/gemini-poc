import { EditOutlined, DeleteOutlined, EmailOutlined } from '@mui/icons-material';
import { Card, Avatar, CardContent, Typography, CardActions, IconButton, Box, Tooltip, useTheme, Button, Dialog, TextField, DialogActions, DialogTitle, DialogContent } from '@mui/material';

import { User } from '../../types';
import Task from '../../types/interfaces/Task';
import { useState } from 'react';
import { editTask, removeTask } from '../../store/slices/taskSlice';
import { useAppDispatch } from '../../store';

interface TaskCardProps {
    task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState({ id: 0, title: '', description: '', dueDate: '', status: 'Pending' });
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
    });

    const handleSendEmail = () => {
        // console.log('Send email:', user.email);
    };

    const handleOpen = (task?: any) => {
        if (task) {
            setCurrentTask(task); // Editar
        } else {
            setCurrentTask({ id: 0, title: '', description: '', dueDate: '', status: 'Pending' }); // Nueva
        }
        setOpen(true);
    };

    const handleClose = () => setOpen(false);


    const handleDelete = () => {
    dispatch(removeTask(task.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log(task)
    console.log(editedTask)
    dispatch(editTask({ taskId: task?.id, updatedTask: editedTask }));
    setIsEditing(false);
  };

    return (
        <Card>
        <CardContent>
          <Typography variant="h5">{task.title}</Typography>
          <Typography>{task.description}</Typography>
          <Typography>{task.dueDate}</Typography>
          <Typography>Status: {task.status}</Typography>
          <Button variant="contained" onClick={handleEdit}>Edit</Button>
          <Button variant="outlined" color="secondary" onClick={handleDelete}>Delete</Button>
  
          <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogContent>
              <TextField
                label="Title"
                value={editedTask.title}
                margin='dense'
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                fullWidth
              />
              <TextField
                label="Description"
                value={editedTask.description}
                margin='dense'
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                fullWidth
              />
              <TextField
                type="date"
                value={editedTask.dueDate}
                margin='dense'
                onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                fullWidth
              />
              <TextField
                label="Status"
                value={editedTask.status}
                margin='dense'
                onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsEditing(false)} color="secondary">Cancel</Button>
              <Button onClick={handleSave} color="primary">Save</Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    );
};