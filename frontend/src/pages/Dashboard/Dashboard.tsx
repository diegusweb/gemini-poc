import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, TextField, Typography } from "@mui/material";
import { Loader, ToggleThemeMode, UserCard } from "../../components";
import { getToken } from "../../utils/HelperFucntions";
import { selectIsAuthenticated, useAppDispatch, useAppSelector } from "../../store";
import { useNavigate } from "react-router-dom";
import { LOgout } from "../../components/logout/Logout";
import { useEffect, useState } from "react";
import { addTask, getAllTasks, selectTasks } from "../../store/slices/taskSlice";
import { useSelector } from "react-redux";
import { TaskCard } from "../../components/task-card/TaskCard";



export const Dashboard = () => {
  //const { token, loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();
  const isLoadingUsers = useSelector(selectIsAuthenticated);
  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({ id: 0, title: '', description: '', dueDate: '', status: 'Pending' });



  if (getToken() === "" && !isLoadingUsers) {
    navigate('/');
    return;
  }

  useEffect(() => {
    console.log(tasks)
    if (tasks.status === 'idle') {
      dispatch(getAllTasks({}));
    }
  }, [tasks.status, dispatch]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleSave = () => {
    console.log(currentTask)
    dispatch(addTask(currentTask));
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" align="center" sx={{ m: 2 }}>
          React App From Home
        </Typography>

        <Box sx={{ m: 2 }}>
          <ToggleThemeMode />
        </Box>
        <Box sx={{ m: 2 }}>
          <LOgout />
        </Box>
      </Box>

      <Divider />

      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Agregar Tarea
        </Button>
        <Grid container spacing={4}>
          {!isLoadingUsers ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', m: 4 }}>
              <Loader />
            </Box>
          ) : (
            tasks.tasks?.map((tasks: any) => (
              <Grid item lg={4} md={6} sm={6} xs={12} width="100%" key={tasks.id}>
                <TaskCard task={tasks} />
              </Grid>
            ))
          )}
        </Grid>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{currentTask.id === 0 ? 'Nueva Tarea' : 'Editar Tarea'}</DialogTitle>
          <DialogContent>
            <TextField
              label="Título"
              fullWidth
              margin="dense"
              value={currentTask.title}
              onChange={e => setCurrentTask({ ...currentTask, title: e.target.value })}
            />
            <TextField
              label="Descripción"
              fullWidth
              margin="dense"
              value={currentTask.description}
              onChange={e => setCurrentTask({ ...currentTask, description: e.target.value })}
            />
            <TextField
              label="Fecha de Vencimiento"
              type="date"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              value={currentTask.dueDate}
              onChange={e => setCurrentTask({ ...currentTask, dueDate: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleSave} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};