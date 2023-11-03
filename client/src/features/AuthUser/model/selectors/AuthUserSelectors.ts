import { StateSchema } from 'app/providers/StoreProvider';

export const getUserData = (state: StateSchema) => state.authUser.data;
export const getUserLogin = (state: StateSchema) => state.authUser?.data.login || '';
export const getUserPassword = (state: StateSchema) => state.authUser?.data.password || '';
export const getUserName = (state: StateSchema) => state.authUser?.data.name || '';

export const getUserAuthIsLoading = (state: StateSchema) => state.authUser?.isLoading || false;
export const getUserAuthError = (state: StateSchema) => state.authUser?.error || '';
