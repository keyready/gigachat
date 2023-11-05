import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RefreshToken } from '../services/RefreshToken';
import { UserLogout } from '../services/UserLogout';
import { SignInUser } from '../services/SignInUser';
import { AuthUserSchema } from '../types/AuthUser';
import { SignUpUser } from '../services/SignUpUser';

const initialState: AuthUserSchema = {
    isLoading: false,
    login: '',
    password: '',
    name: '',
};

export const AuthUserSlice = createSlice({
    name: 'AuthUserSlice',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<string>) => {
            state.login = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(SignInUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(SignInUser.fulfilled, (state) => {
                state.isLoading = false;
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
            })
            .addCase(SignUpUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(RefreshToken.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(RefreshToken.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(RefreshToken.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(UserLogout.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(UserLogout.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(UserLogout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: AuthUserActions } = AuthUserSlice;
export const { reducer: AuthUserReducer } = AuthUserSlice;
