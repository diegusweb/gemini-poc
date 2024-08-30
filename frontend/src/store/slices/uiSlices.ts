
import { SIDEBAR_WIDTH, ThemeModeEnum, TOPBAR_HEIGHT } from "../../types";
import { createSlice } from "@reduxjs/toolkit";

interface UiState {
    sidebarWidth: number;
    topbarHeight: number;
    isSidebarOpen: boolean;
    themeMode: ThemeModeEnum;
}

const initialState: UiState = {
    sidebarWidth: SIDEBAR_WIDTH,
    topbarHeight: TOPBAR_HEIGHT,
    isSidebarOpen: true,
    themeMode: ThemeModeEnum.LIGHT,
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.isSidebarOpen = !state.isSidebarOpen;
          },
          toggleThemeMode(state) {
            state.themeMode = state.themeMode === ThemeModeEnum.LIGHT ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT;
          },
    },
});

export const { toggleSidebar, toggleThemeMode } = uiSlice.actions;
