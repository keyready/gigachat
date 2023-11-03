import { Page } from 'widgets/Page/Page';
import { useCallback, useEffect } from 'react';
import { Text } from 'shared/UI/Text';
import { Input } from 'shared/UI/Input';
import { Button } from 'shared/UI/Button';
import { useSelector } from 'react-redux';
import {
    AuthUserActions,
    AuthUserReducer,
    getUserAuthError,
    getUserAuthIsLoading,
    getUserLogin,
    getUserName,
    getUserPassword,
    SignInUser,
    SignUpUser,
} from 'features/AuthUser';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { HStack } from 'shared/UI/Stack';

const MainPage = () => {
    useEffect(() => {
        document.title = 'GigaChat';
    }, []);

    const userLogin = useSelector(getUserLogin);
    const userPassword = useSelector(getUserPassword);
    const userName = useSelector(getUserName);
    const userIsLoading = useSelector(getUserAuthIsLoading);
    const userError = useSelector(getUserAuthError);

    const dispatch = useAppDispatch();

    const handleUsernameChange = useCallback(
        (value: string) => {
            dispatch(AuthUserActions.setLogin(value));
        },
        [dispatch],
    );
    const handlePasswordChange = useCallback(
        (value: string) => {
            dispatch(AuthUserActions.setPassword(value));
        },
        [dispatch],
    );
    const handleNameChange = useCallback(
        (value: string) => {
            dispatch(AuthUserActions.setName(value));
        },
        [dispatch],
    );

    const handleSignInClick = useCallback(() => {
        dispatch(SignInUser());
    }, [dispatch]);
    const handleSignUpClick = useCallback(() => {
        dispatch(SignUpUser());
    }, [dispatch]);

    return (
        <Page>
            {userError && <Text title={userError.message} />}
            {userName && <Text title={`Привет, ${userName}`} />}
            <Input placeholder="Введите логин" value={userLogin} onChange={handleUsernameChange} />
            <Input
                placeholder="Введите пароль"
                value={userPassword}
                onChange={handlePasswordChange}
            />
            <Input
                placeholder="Введите имя (при регистрации)"
                value={userName}
                onChange={handleNameChange}
            />
            <HStack maxW justify="between">
                <Button onClick={handleSignInClick}>Отправить</Button>
                <Button onClick={handleSignUpClick}>Зарегистрировать</Button>
            </HStack>

            {userIsLoading && <Text title="Подождите, идет загрузка" />}
        </Page>
    );
};

export default MainPage;
