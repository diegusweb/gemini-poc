import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { authSlice, setAuthState } from "../slices/authSlice";
import { uiSlice } from "../slices/uiSlices";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import { taskSlice } from "../slices/taskSlice";
import { getToken } from "../../utils/HelperFucntions";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth', 'ui']
}

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        task: taskSlice.reducer,
        ui: uiSlice.reducer
    }
});

const token = getToken();
if(token){
    store.dispatch(setAuthState(true))
}


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
