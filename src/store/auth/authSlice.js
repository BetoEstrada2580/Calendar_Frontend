import { createSlice } from '@reduxjs/toolkit';

export const statusAuth = {
    checking: 'checking',
    authenticated: 'authenticated',
    not_authenticated: 'not-authenticated'
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: statusAuth.checking,
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        onChecking: (state) => {
            state.status = statusAuth.checking;
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }) => {
            state.status = statusAuth.authenticated;
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, { payload }) => {
            state.status = statusAuth.not_authenticated;
            state.user = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        }
    }
});

// Action creators are generated for each case reducer function
export const {
    clearErrorMessage,
    onChecking,
    onLogin,
    onLogout,
} = authSlice.actions;