import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, TextField, Typography } from "@mui/material";
import { Loader, ToggleThemeMode, UserCard } from "../../components";
import { getToken } from "../../utils/HelperFucntions";
import { selectIsAuthenticated, useAppDispatch, useAppSelector } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { LOgout } from "../../components/logout/Logout";
import { ChangeEvent, useEffect, useState } from "react";
import { addTask, getAllTasks, selectTasks } from "../../store/slices/taskSlice";
import { useSelector } from "react-redux";
import { TaskCard } from "../../components/task-card/TaskCard";
import DeleteConfirmationModal from "../../components/modal/DeleteConfirmationModal";
import { toast } from "react-toastify";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export const Dashboard = () => {
  //const { token, loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();
  const isLoadingUsers = useSelector(selectIsAuthenticated);
  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({ title: '', description: '', dueDate: '', status: 'Pending' });

  const [formValues, setFormValues] = useState({
    title: {
      value: '',
      error: false,
      errorMessage: 'You must enter an title'
    },
    description: {
      value: '',
      error: false,
      errorMessage: 'You must enter an description'
    },
    dueDate: {
      value: '',
      error: false,
      errorMessage: 'You must enter an date'
    }
  })

  useEffect(() => {
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

  const handleSave = (e: any) => {
    e.preventDefault();
    const formFields: FormValuesKeys[] = ['title', 'description', 'dueDate']; // Specify the keys directly
    let newFormValues = { ...formValues };

    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue = formValues[currentField].value;

      // Check for empty fields AND validate email if it's the email field
      if (currentValue === '') {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField],
            error: true,
          },
        };
      } else {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField],
            error: false,
          },
        };
      }
    }
    setFormValues(newFormValues);

    const hasErrors = Object.values(newFormValues).some(
      (field) => field.error === true
    );

    if (!hasErrors) {
      dispatch(addTask({
        'title': formValues.title.value,
        'description': formValues.description.value,
        'dueDate': formValues.dueDate.value,
        'status': 'Pending'
      })).then(() => {
        handleClose();
        toast.success("New task created", {
          autoClose: 2000, hideProgressBar: true, position: "bottom-right",
          closeOnClick: true, pauseOnHover: true, theme: "colored",
        });
      });
    }


  }

  const handleDeleteTask = (taskId: any) => {
    console.log(taskId)
  };

  type FormValuesKeys = 'title' | 'description' | 'dueDate';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as FormValuesKeys;
    const value = e.target.value;

    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
        error: formValues[name].error, // Validate email
        errorMessage: formValues[name].errorMessage
      }
    });
  }


  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" align="center" sx={{ m: 2 }}>
          React App Task Managament
        </Typography>

        <Box sx={{ m: 2 }}>
          <Button variant="contained" color="primary" onClick={() => handleOpen()}>
            Agregar Tarea
          </Button>
        </Box>

        <Box sx={{ m: 2, width: 100, display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ m: 1 }}>
            <Link to="/profile"><AccountCircleIcon /></Link>

          </Box>
          <Box sx={{ m: 0 }}>
            <LOgout />
          </Box>

        </Box>
      </Box>

      <Divider />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <Typography align="center" sx={{ m: 2 }}>
            Total Task created:  {tasks.tasks.length}
          </Typography>
        </Box>
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <Typography align="center" sx={{ m: 2 }}>
          Total Task pending: {tasks.tasks.filter((task: any) => task.status === 'Pending').length}
          </Typography>
        </Box>
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <Typography align="center" sx={{ m: 2 }}>
          Total Task Completed: {tasks.tasks.filter((task: any) => task.status === 'Completed').length}
          </Typography>
        </Box>
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <Typography align="center" sx={{ m: 2 }}>
          Total Task inprogress: {tasks.tasks.filter((task: any) => task.status === 'inprogress').length}
          </Typography>
        </Box>

      </Box>

      <Divider />

      <Container maxWidth="lg" sx={{ p: 2 }}>

        <Grid container spacing={4}>
          {!isLoadingUsers ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', m: 4 }}>
              <Loader />
            </Box>
          ) : (
            tasks.tasks?.map((tasks: any) => (
              <Grid item lg={4} md={6} sm={6} xs={12} width="100%" key={tasks.id}>
                <TaskCard task={tasks} onDelete={handleDeleteTask} />
              </Grid>
            ))
          )}
        </Grid>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Nueva Tarea</DialogTitle>
          <DialogContent>
            <TextField
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="title"
              name="title"
              autoFocus
              error={formValues.title.error}
              value={formValues.title.value}
              helperText={formValues.title.error && formValues.title.errorMessage}
            />
            <TextField
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="description"
              label="description"
              type="text"
              id="description"
              autoComplete="current-password"
              error={formValues.description.error}
              value={formValues.description.value}
              helperText={formValues.description.error && formValues.description.errorMessage}
            />
            <TextField
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              type="date"
              required
              fullWidth
              name="dueDate"
              label="dueDate"
              id="dueDate"
              autoComplete="current-password"
              error={formValues.dueDate.error}
              value={formValues.dueDate.value}
              helperText={formValues.dueDate.error && formValues.dueDate.errorMessage}
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