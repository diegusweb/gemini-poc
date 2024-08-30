import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: null,
    isAuthenticated: false,
};

export const authSlice =createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
        },
        clearCredentials(state) {
            state.token = null;
            state.isAuthenticated = false;
        },
        setCredentials(state, action) {
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
    },

});

export const { login, logout, clearCredentials, setCredentials } = authSlice.actions;

//export const authReducer = authSlice.reducer;