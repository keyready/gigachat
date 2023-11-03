import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig, ThunkError } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { User, UserActions } from 'entities/User';

export const RefreshToken = createAsyncThunk<User, string, ThunkConfig<ThunkError>>(
    'AuthUser/RefreshToken',
    async (token, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await extra.api.post<User>('/refresh_token', {
                token,
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(UserActions.setUserData(response.data));
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data);
        }
    },
);
