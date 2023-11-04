import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { HStack } from 'shared/UI/Stack';
import { Text } from 'shared/UI/Text';
import ChatIcon from 'shared/assets/icons/chat-icon.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { Chat } from '../../model/types/Chat';
import classes from './ChatCard.module.scss';

interface ChatCardProps {
    className?: string;
    chat: Chat;
    setSelectedChat: (chat: Chat) => void;
    selectedChat?: Chat;
}

export const ChatCard = memo((props: ChatCardProps) => {
    const { className, chat, setSelectedChat, selectedChat } = props;

    const handleChatClick = useCallback(() => {
        setSelectedChat(chat);
    }, [chat, setSelectedChat]);

    return (
        <HStack
            gap="8"
            className={classNames(
                classes.ChatCard,
                {
                    [classes.selected]: selectedChat?.id === chat.id,
                },
                [className],
            )}
            onClick={handleChatClick}
        >
            <Icon Svg={ChatIcon} className={classes.icon} />
            <Text className={classes.title} title={chat.title} size="small" />
        </HStack>
    );
});
