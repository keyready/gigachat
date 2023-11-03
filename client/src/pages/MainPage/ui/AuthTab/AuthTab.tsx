import { memo } from 'react';
import { VStack } from 'shared/UI/Stack';
import { Input } from 'shared/UI/Input';
import { Button } from 'shared/UI/Button';
import classes from './tab.module.scss';

interface AuthTabProps {
    login: string;
    password: string;
    handleLoginChange: (value: string) => void;
    handlePasswordChange: (value: string) => void;
    handleSignInClick: () => void;
}

export const AuthTab = memo((props: AuthTabProps) => (
    <VStack maxW className={classes.panel}>
        <Input placeholder="Введите логин" value={props.login} onChange={props.handleLoginChange} />
        <Input
            placeholder="Введите пароль"
            value={props.password}
            onChange={props.handlePasswordChange}
        />
        <Button onClick={props.handleSignInClick}>Отправить</Button>
    </VStack>
));
