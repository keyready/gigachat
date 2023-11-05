import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text } from 'shared/UI/Text';
import { Message } from '../../types/message';
import classes from './MessageCard.module.scss';

interface MessageCardProps {
    className?: string;
    message: Message;
}

export const MessageCard = memo((props: MessageCardProps) => {
    const { className, message } = props;

    return (
        <div
            className={classNames(
                classes.MessageCard,
                { [classes.BotMessage]: message.role === 'assistant' },
                [className],
            )}
        >
            <Text text={message.content} />
        </div>
    );
});
