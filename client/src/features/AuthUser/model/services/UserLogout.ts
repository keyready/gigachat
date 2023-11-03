import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig, ThunkError } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { UserActions } from 'entities/User';

export const UserLogout = createAsyncThunk<string, string, ThunkConfig<ThunkError>>(
    'AuthUser/UserLogout',
    async (userLogin, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await extra.api.post<string>('/logout', { userLogin });

            if (!response.data) {
                throw new Error();
            }

            dispatch(UserActions.logout());
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data);
        }
    },
);
