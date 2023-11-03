import { memo, useCallback } from 'react';
import { VStack } from 'shared/UI/Stack';
import { Input } from 'shared/UI/Input';
import { Button } from 'shared/UI/Button';
import classes from './tab.module.scss';

interface RegisterTabProps {
    login: string;
    password: string;
    name: string;
    handleLoginChange: (value: string) => void;
    handlePasswordChange: (value: string) => void;
    handleNameChange: (value: string) => void;
    handleSignUpClick: () => void;
}

export const RegisterTab = memo((props: RegisterTabProps) => (
    <VStack maxW className={classes.panel}>
        <Input placeholder="Введите логин" value={props.login} onChange={props.handleLoginChange} />
        <Input
            placeholder="Введите пароль"
            value={props.password}
            onChange={props.handlePasswordChange}
        />
        <Input placeholder="Введите имя" value={props.name} onChange={props.handleNameChange} />
        <Button onClick={props.handleSignUpClick}>Зарегистрировать</Button>
    </VStack>
));
