import { Page } from 'widgets/Page/Page';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    AuthUserActions,
    getAuthUserError,
    getAuthUserIsLoading,
    getAuthUserLogin,
    getAuthUserName,
    getAuthUserPassword,
    SignInUser,
    SignUpUser,
} from 'features/AuthUser';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Tabs } from 'shared/UI/Tab';
import { HStack, VStack } from 'shared/UI/Stack';
import { Text } from 'shared/UI/Text';
import { Loader } from 'shared/UI/Loader';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import { AuthTab } from '../AuthTab/AuthTab';
import { RegisterTab } from '../AuthTab/RegisterTab';
import classes from './MainPage.module.scss';

const MainPage = () => {
    useEffect(() => {
        document.title = 'GigaChat';
    }, []);

    const userLogin = useSelector(getAuthUserLogin);
    const userPassword = useSelector(getAuthUserPassword);
    const userName = useSelector(getAuthUserName);
    const userIsLoading = useSelector(getAuthUserIsLoading);
    const userError = useSelector(getAuthUserError);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
    const handleSignInClick = useCallback(async () => {
        const result = await dispatch(SignInUser());

        if (result.meta.requestStatus === 'fulfilled') {
            navigate(RoutePath.dialog);
        }
    }, [dispatch, navigate]);
    const handleSignUpClick = useCallback(async () => {
        const result = await dispatch(SignUpUser());

        if (result.meta.requestStatus === 'fulfilled') {
            navigate(RoutePath.dialog);
        }
    }, [dispatch, navigate]);

    return (
        <Page>
            <HStack className={classes.wrapper} gap="16" maxW justify="between" align="start">
                <div className={classes.content} />
                <VStack className={classes.tabs}>
                    <Tabs
                        titles={['Авторизация', 'Регистрация']}
                        content={[
                            userIsLoading ? (
                                <Skeleton height="20vh" border="10px" className={classes.tabs} />
                            ) : (
                                <AuthTab
                                    login={userLogin}
                                    password={userPassword}
                                    handleLoginChange={handleUsernameChange}
                                    handlePasswordChange={handlePasswordChange}
                                    handleSignInClick={handleSignInClick}
                                />
                            ),
                            userIsLoading ? (
                                <Skeleton height="30vh" border="10px" className={classes.tabs} />
                            ) : (
                                <RegisterTab
                                    login={userLogin}
                                    password={userPassword}
                                    name={userName}
                                    handleLoginChange={handleUsernameChange}
                                    handlePasswordChange={handlePasswordChange}
                                    handleNameChange={handleNameChange}
                                    handleSignUpClick={handleSignUpClick}
                                />
                            ),
                        ]}
                    />
                    {userError && (
                        <Text
                            variant="error"
                            size="small"
                            title="Произошла ошибка"
                            text={userError.message}
                        />
                    )}
                </VStack>
            </HStack>
        </Page>
    );
};

export default MainPage;
