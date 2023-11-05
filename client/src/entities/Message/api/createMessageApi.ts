import { rtkApi } from 'shared/api/rtkApi';
import { Message } from '../types/message';

interface Props {
    text: string;
    chatId: number;
}

const sendMessageApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        sendMessage: builder.mutation<Message[], Props>({
            query: ({ text, chatId }) => ({
                url: '/send_message',
                method: 'POST',
                body: { text, chatId },
            }),
        }),
    }),
});

export const useSendMessage = sendMessageApi.useSendMessageMutation;
