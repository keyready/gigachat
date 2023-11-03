import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'entities/User';
import { UserSchema } from '../types/UserSchema';

const initialState: UserSchema = {
    isLoading: false,
};

export const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<User>) => {
            state.data = action.payload;
        },
        logout: (state) => {
            state.data = undefined;
        },
    },
});

export const { actions: UserActions } = UserSlice;
export const { reducer: UserReducer } = UserSlice;
