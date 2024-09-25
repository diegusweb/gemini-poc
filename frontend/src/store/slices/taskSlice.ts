import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AppServices from "../../services/App.services";
import Task from "../../types/interfaces/Task";
import { RootState } from "../store";


type TaskState = {
    tasks: Task[],
    status: string,
    loading: boolean,
    count: number,

}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    status: 'idle',
    count: 0
};

export const getAllTasks = createAsyncThunk('api/tasks', async (payload: any) => {
    const response = await AppServices.getTasks()
    return response.data;
});

export const addTask = createAsyncThunk('api/addTask', async (task: any) => {
    const response = await AppServices.addTasks(task);
    return response.data;
});

export const editTask = createAsyncThunk('tasks/editTask', async (payload:any) => {
    const response = await AppServices.updateTask(payload.taskId, payload.updatedTask);
    return response.data;
});

// Eliminar una tarea
export const removeTask = createAsyncThunk('tasks/removeTask', async (taskId:any) => {
    await AppServices.deleteTask(taskId);
    return taskId;
});

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAllTasks.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
            })
            .addCase(getAllTasks.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.loading = false;
                state.tasks = action.payload;
                state.count = action.payload.length;
            })
            .addCase(getAllTasks.rejected, (state, action) => {
                state.status = "failed";
                state.loading = false;
            })
            .addCase(addTask.pending, (state, action) => {
                state.status = "failed";
                state.loading = false;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                console.log(action.payload)
                state.tasks.push(action.payload);
                state.status = "succeeded";
                state.loading = false;
            })
            .addCase(addTask.rejected, (state, action) => {
                state.status = "failed";
                state.loading = false;
            })
            .addCase(editTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            });
    },
    reducers: {}
})

export const selectTasks = (state: RootState) => state.task;
export const { } = taskSlice.actions;