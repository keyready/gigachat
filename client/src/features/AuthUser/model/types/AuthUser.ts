import { ThunkError } from 'app/providers/StoreProvider';

export interface AuthUser {
    login: string;
    password: string;
    name: string;
}

export interface AuthUserSchema {
    data: AuthUser;
    isLoading: boolean;
    error?: ThunkError;
}
