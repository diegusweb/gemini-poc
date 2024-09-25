import { render, screen, fireEvent } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import { BrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { addTask, getAllTasks, selectTasks } from '../../store/slices/taskSlice';
import { toast } from 'react-toastify';
import store from '../../store/store/store';
import { TaskCard } from '../../components/task-card/TaskCard';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux'; // Correct import

jest.mock('../../store/slices/taskSlice');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));
jest.mock('../../components/task-card/TaskCard', () => ({
  TaskCard: jest.fn(() => null),
}));

describe('Dashboard Component', () => {
  const mockTasks = [
    { id: 1, title: 'Task 1', description: 'Description 1', dueDate: '2024-03-10', status: 'Pending' },
    { id: 2, title: 'Task 2', description: 'Description 2', dueDate: '2024-03-15', status: 'Completed' },
  ];

  beforeEach(() => {
    (useAppSelector as jest.Mock).mockReturnValue({
      tasks: {
        status: 'succeeded',
        tasks: mockTasks,
      },
    });
    (getAllTasks as unknown as jest.Mock).mockResolvedValue({ 
      type: 'task/getAllTasks/fulfilled',
      payload: mockTasks,
    });
    (toast.success as jest.Mock).mockClear();
  });

  it('renders dashboard with tasks', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('React App Task Managament')).toBeInTheDocument();
    expect(screen.getByText('Agregar Tarea')).toBeInTheDocument();

    mockTasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
    });
  });

  it('fetches tasks on mount', () => {
    const dispatchMock = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    expect(dispatchMock).toHaveBeenCalledWith(getAllTasks({}));
  });

  it('opens and closes the add task dialog', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    const addTaskButton = screen.getByText('Agregar Tarea');
    fireEvent.click(addTaskButton);
    expect(screen.getByText('Nueva Tarea')).toBeVisible();

    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);
    expect(screen.queryByText('Nueva Tarea')).not.toBeInTheDocument();
  });

  it('handles form submission and adds a new task', async () => {
    const dispatchMock = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    const addTaskButton = screen.getByText('Agregar Tarea');
    fireEvent.click(addTaskButton);

    const titleInput = screen.getByLabelText('title') as HTMLInputElement;
    const descriptionInput = screen.getByLabelText('description') as HTMLInputElement;
    const dueDateInput = screen.getByLabelText('dueDate') as HTMLInputElement;
    const saveButton = screen.getByText('Guardar');

    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });
    fireEvent.change(dueDateInput, { target: { value: '2024-04-01' } });
    fireEvent.click(saveButton);

    expect(dispatchMock).toHaveBeenCalledWith(
      addTask({
        title: 'New Task',
        description: 'New Description',
        dueDate: '2024-04-01',
        status: 'Pending',
      })
    );

    // Wait for the toast to be displayed
    await screen.findByText('New task created');

    expect(toast.success).toHaveBeenCalledWith('New task created', {
      autoClose: 2000,
      hideProgressBar: true,
      position: 'bottom-right',
      closeOnClick: true,
      pauseOnHover: true,
      theme: 'colored',
    });
  });

  it('validates form fields and shows error messages', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    const addTaskButton = screen.getByText('Agregar Tarea');
    fireEvent.click(addTaskButton);

    const saveButton = screen.getByText('Guardar');
    fireEvent.click(saveButton);

    expect(screen.getByText('You must enter an title')).toBeVisible();
    expect(screen.getByText('You must enter an description')).toBeVisible();
    expect(screen.getByText('You must enter an date')).toBeVisible();
  });

  it('renders TaskCard component for each task', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    mockTasks.forEach((task) => {
      expect(TaskCard).toHaveBeenCalledWith(
        expect.objectContaining({ task }),
        expect.anything()
      );
    });
  });
});
