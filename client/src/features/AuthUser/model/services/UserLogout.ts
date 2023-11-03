import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig, ThunkError } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { AuthUser } from 'features/AuthUser';

export const UserLogout = createAsyncThunk<string, AuthUser, ThunkConfig<ThunkError>>(
    'AuthUser/UserLogout',
    async (userData, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<string>('/logout', userData);

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
