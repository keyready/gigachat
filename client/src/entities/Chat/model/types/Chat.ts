import { Message } from 'entities/Message';

export interface Chat {
    id: number;
    title: string;
    userId: number;
    messages: Message[];
    folderId: number;
}
