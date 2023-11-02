import { StateSchema } from 'app/providers/StoreProvider';

export const getSubjectData = (state: StateSchema) => state.subject.data;
export const getSubjectIsLoading = (state: StateSchema) => state.subject.isLoading;
export const getSubjectError = (state: StateSchema) => state.subject.error;
