import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatSchema } from '../types/ChatSchema';

const initialState: ChatSchema = {
    isLoading: false,
};

export const ChatSlice = createSlice({
    name: 'ChatSlice',
    initialState,
    reducers: {},
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(_.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(_.fulfilled, (state, action: PayloadAction<any>) => {
    //             state.isLoading = false;
    //             state.data = action.payload;
    //         })
    //         .addCase(_.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: ChatActions } = ChatSlice;
export const { reducer: ChatReducer } = ChatSlice;
