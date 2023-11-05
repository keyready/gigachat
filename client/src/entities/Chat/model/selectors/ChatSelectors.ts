import { StateSchema } from 'app/providers/StoreProvider';

export const getChatData = (state: StateSchema) => state.chat?.data;
export const getChatIsLoading = (state: StateSchema) => state.chat?.isLoading;
export const getChatError = (state: StateSchema) => state.chat?.error;
