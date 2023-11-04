import { classNames } from 'shared/lib/classNames/classNames';
import { FormEvent, memo, useCallback, useEffect, useState } from 'react';
import { Chat } from 'entities/Chat';
import { HStack, VStack } from 'shared/UI/Stack';
import { MessageCard } from 'entities/Message/ui/MessageCard/MessageCard';
import { Input } from 'shared/UI/Input';
import { Text } from 'shared/UI/Text';
import { useSendMessage } from 'entities/Message/api/createMessageApi';
import { Message } from 'entities/Message';
import classes from './MessagesList.module.scss';

interface MessagesListProps {
    className?: string;
    chat: Chat;
}

export const MessagesList = memo((props: MessagesListProps) => {
    const { className, chat } = props;

    const [newMessageText, setNewMessageText] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    const [sendMessage, { data: newMessage, isLoading: isNewMessageLoading }] = useSendMessage();

    useEffect(() => {
        if (newMessage?.length) setMessages((prevState) => [...prevState, ...newMessage]);
    }, [newMessage]);

    useEffect(() => {
        setMessages(chat.messages);
    }, [chat.messages]);

    const handleNewMessageSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            sendMessage({ text: newMessageText, chatId: chat.id });

            setNewMessageText('');
        },
        [chat.id, newMessageText, sendMessage],
    );

    return (
        <VStack gap="32" maxW className={classNames(classes.MessagesList, {}, [className])}>
            <VStack maxW className={classes.messages}>
                {messages?.length ? (
                    <VStack maxW gap="16">
                        {messages.map((message) => (
                            <MessageCard message={message} key={message.id} />
                        ))}
                    </VStack>
                ) : (
                    <Text text="Сообщений пока нет" />
                )}
            </VStack>

            <form className={classes.newMessage} onSubmit={handleNewMessageSubmit}>
                <HStack maxW>
                    <Input
                        placeholder="Напишите сообщение"
                        value={newMessageText}
                        onChange={(value) => setNewMessageText(value)}
                    />
                    <button type="submit" className={classes.btn} />
                </HStack>
            </form>
        </VStack>
    );
});
