import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig, ThunkError } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { AuthUser } from '../types/AuthUser';

export const RefreshToken = createAsyncThunk<AuthUser, string, ThunkConfig<ThunkError>>(
    'AuthUser/RefreshToken',
    async (token, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<AuthUser>('/refresh_token', {
                token,
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
