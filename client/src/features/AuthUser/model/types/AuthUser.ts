import { ThunkError } from 'app/providers/StoreProvider';

export interface AuthUserSchema {
    login: string;
    password: string;
    name: string;
    isLoading: boolean;
    error?: ThunkError;
}
