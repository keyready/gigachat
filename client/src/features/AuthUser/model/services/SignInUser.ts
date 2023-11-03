import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig, ThunkError } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { getUserLogin, getUserPassword } from '../selectors/AuthUserSelectors';
import {AuthUser} from "../types/AuthUser";

export const SignInUser = createAsyncThunk<AuthUser, void, ThunkConfig<ThunkError>>(
    'AuthUser/SignInUser',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;

        try {
            const login = getUserLogin(getState());
            const password = getUserPassword(getState());

            const response = await extra.api.post<AuthUser>('/sign_in', {
                login,
                password,
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data);
        }
    },
);
