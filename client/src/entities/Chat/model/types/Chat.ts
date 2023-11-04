export interface Chat {
    id: number;
    title: string;
    userId: number; // владелец чата
    messagesId: number; // id сообщений чата
    folderId: number; // id папки с чатами
}
