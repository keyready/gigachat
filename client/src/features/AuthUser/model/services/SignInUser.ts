import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig, ThunkError } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { User, UserActions } from 'entities/User';
import { getAuthUserLogin, getAuthUserPassword } from '../selectors/AuthUserSelectors';

export const SignInUser = createAsyncThunk<User, void, ThunkConfig<ThunkError>>(
    'AuthUser/SignInUser',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, getState, dispatch } = thunkAPI;

        try {
            const login = getAuthUserLogin(getState());
            const password = getAuthUserPassword(getState());

            const response = await extra.api.post<User>('/sign_in', {
                login,
                password,
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
