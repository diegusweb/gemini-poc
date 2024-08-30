import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { authSlice } from "../slices/authSlice";
import { uiSlice } from "../slices/uiSlices";
import { userApi } from "../apis/userApis";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth', 'ui']
}

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(userApi.middleware),
});

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
