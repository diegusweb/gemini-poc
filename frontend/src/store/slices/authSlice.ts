import { createSlice } from "@reduxjs/toolkit";
import { RoleEnum } from "../../types/enums/role.enum";

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    isUser: boolean;
    isAdmin: boolean;
}

const initialState: AuthState = {
    token: null,
    isAuthenticated: false,
    isUser: false,
    isAdmin: false,
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
            state.isUser = false;
            state.isAdmin = false;
        },
        setCredentials(state, action) {
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.isUser = action.payload.role === RoleEnum.USER;
            state.isAdmin = action.payload.role === RoleEnum.ADMIN;
        },
    },

});

export const { login, logout, clearCredentials, setCredentials } = authSlice.actions;