import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkError } from 'app/providers/StoreProvider';
import { SignInUser } from '../services/SignInUser';
import {AuthUser, AuthUserSchema} from "../types/AuthUser";
import { SignUpUser } from '../services/SignUpUser';

const initialState: AuthUserSchema = {
    data: {
        login: '',
        name: '',
        password: '',
    },
    isLoading: false,
    error: undefined,
};

export const AuthUserSlice = createSlice({
    name: 'AuthUserSlice',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<string>) => {
            state.data.login = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.data.password = action.payload;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.data.name = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(SignInUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(SignInUser.fulfilled, (state, action: PayloadAction<AuthUser>) => {
                state.isLoading = false;
                state.data = { ...action.payload, password: '' };
            })
            .addCase(SignInUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(SignUpUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(SignUpUser.fulfilled, (state) => {
                state.isLoading = false;
                state.data = { ...state.data, password: '' };
            })
            .addCase(SignUpUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: AuthUserActions } = AuthUserSlice;
export const { reducer: AuthUserReducer } = AuthUserSlice;
