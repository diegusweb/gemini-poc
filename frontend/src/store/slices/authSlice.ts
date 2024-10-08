import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AppServices from "../../services/App.services";
import { removeToken, setToken } from "../../utils/HelperFucntions";
import history from "../../utils/history";
import { RootState } from "../store";

type AuthState = {
    token: string | null,
    isAuthenticated: boolean,
    loading: boolean,
    status: string,
    userData: {}
}

const initialState: AuthState = {
    token: null,
    isAuthenticated: false,
    loading: false,
    status: 'idle',
    userData: {}
};

export const login = createAsyncThunk('auth/login', async (payload: any) => {
    const response = await AppServices.login(payload)
    setToken(response.data.token);
    return response.data;

})

export const logout = createAsyncThunk('auth/signOut', async () => {
    removeToken();
    return null;
});

export const singup = createAsyncThunk('auth/singUp', async (payload: any) => {
    const response = await AppServices.singup(payload)
    return response.data;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.loading = false;
                state.userData = action.payload.userId;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.loading = false;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.token = null;
                state.isAuthenticated = false;
                state.userData = {};
            })
            .addCase(singup.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
            })
            .addCase(singup.rejected, (state, action) => {
                state.status = "failed";
                state.loading = false;
                history.push('/login');
            })
            .addCase(singup.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.loading = false;
            })
    },
    reducers: {
        setAuthState: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        }
    }
})

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;;

export const { setAuthState } = authSlice.actions;
