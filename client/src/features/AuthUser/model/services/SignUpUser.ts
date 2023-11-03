import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig, ThunkError } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { getUserLogin, getUserName, getUserPassword } from '../selectors/AuthUserSelectors';

export const SignUpUser = createAsyncThunk<string, void, ThunkConfig<ThunkError>>(
    'AuthUser/SignUpUser',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;

        try {
            const login = getUserLogin(getState());
            const password = getUserPassword(getState());
            const name = getUserName(getState());

            const response = await extra.api.post<string>('/sign_up', {
                login,
                password,
                name,
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
