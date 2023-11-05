import { Chat } from './Chat';

export interface ChatSchema {
    data?: Chat;
    isLoading: boolean;
    error?: string;
}
