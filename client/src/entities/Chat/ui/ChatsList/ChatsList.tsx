import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/UI/Stack';
import { ChatCard } from '../ChatCard/ChatCard';
import classes from './ChatsList.module.scss';
import { Chat } from '../../model/types/Chat';

interface ChatsListProps {
    className?: string;
    chats: Chat[];
    setSelectedChat: (chat: Chat) => void;
    selectedChat?: Chat;
}

export const ChatsList = memo((props: ChatsListProps) => {
    const { className, chats, setSelectedChat, selectedChat } = props;

    return (
        <VStack gap="16" className={classNames(classes.ChatsList, {}, [className])}>
            {chats?.map((chat) => (
                <ChatCard
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                    chat={chat}
                    key={chat.id}
                />
            ))}
        </VStack>
    );
});
