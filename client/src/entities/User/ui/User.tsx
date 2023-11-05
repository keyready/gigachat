import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text } from 'shared/UI/Text';
import classes from './User.module.scss';

interface UserProps {
    className?: string;
}

export const User = memo((props: UserProps) => {
    const { className } = props;

    return (
        <div className={classNames(classes.User, {}, [className])}>
            <Text title="Карточка пользователя" />
        </div>
    );
});
