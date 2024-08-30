
import { ThemeModeEnum } from "../../types";
import { createSlice } from "@reduxjs/toolkit";

interface UiState {
    themeMode: ThemeModeEnum;
}

const initialState: UiState = {
    themeMode: ThemeModeEnum.LIGHT,
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleThemeMode(state) {
            state.themeMode = state.themeMode === ThemeModeEnum.LIGHT ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT;
          },
    },
});

export const { toggleThemeMode } = uiSlice.actions;

//export const uiReducer = uiSlice.reducer;