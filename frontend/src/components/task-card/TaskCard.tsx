import { EditOutlined, DeleteOutlined, EmailOutlined } from '@mui/icons-material';
import { Card, Avatar, CardContent, Typography, CardActions, IconButton, Box, Tooltip, useTheme, Button, Dialog, TextField, DialogActions, DialogTitle, DialogContent, Select, InputLabel, MenuItem } from '@mui/material';

import { User } from '../../types';
import Task from '../../types/interfaces/Task';
import { useState } from 'react';
import { editTask, removeTask } from '../../store/slices/taskSlice';
import { useAppDispatch } from '../../store';
import DeleteConfirmationModal from '../modal/DeleteConfirmationModal';

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
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
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);



  const handleDelete = () => {
    dispatch(removeTask(task.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(editTask({ taskId: task?.id, updatedTask: editedTask }));
    setIsEditing(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = () => {
    dispatch(removeTask(task.id));
    if (selectedTask) {
      handleCloseModal();  // Cerrar el modal
    }
  };

  const handleOpenModal = (task: any) => {
    setSelectedTask(task);
    setOpenModal(true);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">{task.title}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{task.description}</Typography>
        <br />
        <br />
        <Typography>{task.dueDate}</Typography>
        <Typography>Status: {task.status}</Typography>
        <br />
        <CardActions>
          <Button variant="contained" onClick={handleEdit}>Edit</Button>
          <Button variant="outlined" color="secondary" onClick={() => handleOpenModal(task)}>Delete</Button>
        </CardActions>


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
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={editedTask.status}
              label="Status"
              onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="InProgress">InProgress</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditing(false)} color="secondary">Cancel</Button>
            <Button onClick={handleSave} color="primary">Save</Button>
          </DialogActions>
        </Dialog>

        <DeleteConfirmationModal
          open={openModal}
          handleClose={handleCloseModal}
          handleDelete={handleDeleteTask}
          taskTitle={selectedTask?.title || null}
        />

      </CardContent>
    </Card>
  );
};