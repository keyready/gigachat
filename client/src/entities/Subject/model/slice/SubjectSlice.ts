import { createSlice } from '@reduxjs/toolkit';
import { SubjectSchema } from '../types/Subject';

const initialState: SubjectSchema = {
    isLoading: false,
};

export const SubjectSlice = createSlice({
    name: 'SubjectSlice',
    initialState,
    reducers: {},
});

export const { actions: SubjectActions } = SubjectSlice;
export const { reducer: SubjectReducer } = SubjectSlice;
