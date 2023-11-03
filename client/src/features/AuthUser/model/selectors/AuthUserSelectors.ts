import { StateSchema } from 'app/providers/StoreProvider';

export const getAuthUserLogin = (state: StateSchema) => state.authUser?.login || '';
export const getAuthUserPassword = (state: StateSchema) => state.authUser?.password || '';
export const getAuthUserName = (state: StateSchema) => state.authUser?.name || '';

export const getAuthUserIsLoading = (state: StateSchema) => state.authUser?.isLoading || false;
export const getAuthUserError = (state: StateSchema) => state.authUser?.error || '';
