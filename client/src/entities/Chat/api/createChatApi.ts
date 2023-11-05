import { rtkApi } from 'shared/api/rtkApi';
import { Chat } from '../model/types/Chat';

const createChatApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        createChat: builder.mutation<Chat[], string>({
            query: (title) => ({
                url: '/create_chat',
                method: 'POST',
                body: { title },
            }),
        }),
        fetchChats: builder.query<Chat[], void>({
            query: () => ({
                url: '/chats',
            }),
        }),
    }),
});

export const useCreateChat = createChatApi.useCreateChatMutation;
export const useFetchChats = createChatApi.useFetchChatsQuery;
