import { User } from './User';

export interface UserSchema {
    data?: User;
    isLoading: boolean;
    error?: string;
}
