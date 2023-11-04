import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import classes from './ChatCard.module.scss';

interface ChatCardProps {
    className?: string;
}

export const ChatCard = memo((props: ChatCardProps) => {
    const { className } = props;

    return (
        <div className={classNames(classes.ChatCard, {}, [className])}>
            <h1>хуй</h1>
        </div>
    );
});
