import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken
        },
        refreshSuccess(state, action) {
            // Этот экшен вызывается при успешном рефреше,
            // чтобы обновить access_token / refresh_token
            state.token = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.refreshToken = null;
        },
    },
});

export const { loginSuccess, refreshSuccess, logout } = authSlice.actions;

export default authSlice.reducer;

