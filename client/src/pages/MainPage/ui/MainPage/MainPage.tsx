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
                <div className={classes.content}>
                    <Text
                        title="Что это такое?"
                        text="Демонстрация тотального обсера под себя от МЛ-команды сбера"
                    />
                    <Text
                        title={'Нейросеть под названием "Гига чат"'}
                        text="Это настоящий кошмар технологий. Представляется она великим прорывом в области искусственного интеллекта, но на деле это лишь криво собранный набор скриптов, которые постоянно сбиваются с толку и выдают абсурдные ответы"
                    />
                    <Text
                        title="Интеллект?"
                        text='Её "интеллект" становится очевиден, когда вы задаёте ей вопросы. Она обещает генерировать ответы на любые вопросы, но в реальности она просто выдаёт случайные ответы, которые часто не имеют никакого отношения к заданному вопросу. Например, однажды пользователь спросил, где находится авианосец "Рональд Рейган", и в ответ получил, что такие корабли обычно находятся в портах приписки, не уточнив, где конкретно находится "Рональд Рейган". Такой ответ не только бесполезен, но и может ввести в заблуждение'
                    />
                    <Text
                        title="Пытается быть полезной"
                        text="Даже когда Гига чат пытается быть полезной, она обычно только усугубляет ситуацию. Например, при попытке предложить рецепт, она рекомендовала использовать и сливки, и соус из яиц и воды от пасты в карбонаре, что является нарушением всех известных рецептов этого блюда. Как минимум, карбонара по версии Гига чата вышла бы невкусной"
                    />
                    <Text
                        title="Словоблудие"
                        text="Несмотря на свои обещания, Гига чат действует как неуправляемый бредогенератор. Его попытки структурировать информацию часто оборачиваются ошибками на уровне начальной школы, а его рассказы часто напоминают бессвязный поток сознания, не имеющий отношения к исходному тексту. Использование Гига чата часто ощущается как попытка общения с недисциплинированным ребенком, который постоянно отвлекается и забывает о чем вы говорите"
                    />
                    <Text
                        title="***** с пляжа!"
                        text='Если бы Гига чат был человеком, его бы, вероятно, уволили за неумение выполнять свои обязанности. Его непредсказуемый формат ответов и склонность к галлюцинациям делают его ненадежным инструментом для любых серьезных задач. Он может написать короткое сообщение в два предложения, а затем выдать огромный текст на пять абзацев, который не имеет никакого отношения к заданному вопросу. Кроме того, его креативность часто оставляет желать лучшего, и он не всегда может сгенерировать творческие тексты с нуля или изобразить популярного персонажа"'
                    />
                    <Text
                        title="Что же в сухом остатке?"
                        text="В итоге, Гига чат - это пример того, как не надо делать нейросети. Она не только бесполезна, но и может стать источником неправильной информации, что делает её не просто бесполезной, но и потенциально вредной."
                    />
                </div>
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
