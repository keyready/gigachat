import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useCallback, useEffect, useState } from 'react';
import { Input } from 'shared/UI/Input';
import { Button } from 'shared/UI/Button';
import { Chat, ChatsList, useCreateChat, useFetchChats } from 'entities/Chat';
import { HStack } from 'shared/UI/Stack';
import { MessagesList } from 'entities/Message';
import { Text } from 'shared/UI/Text';
import classes from './DialogPage.module.scss';

interface DialogPageProps {
    className?: string;
}

const DialogPage = memo((props: DialogPageProps) => {
    const { className } = props;

    const [value, setValue] = useState<string>('');
    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedChat, setSelectedChat] = useState<Chat>();

    const [createChat, { isLoading, data: newChats, error }] = useCreateChat();
    const { data: originChats } = useFetchChats();

    useEffect(() => {
        if (newChats) {
            setChats(newChats);
        }
    }, [newChats]);

    useEffect(() => {
        if (originChats) {
            setChats(originChats);
        }
    }, [originChats]);

    const handleCreateChat = useCallback(async () => {
        await createChat(value);
    }, [createChat, value]);

    return (
        <Page className={classNames(classes.DialogPage, {}, [className])}>
            <Input
                placeholder="Название чата"
                value={value}
                onChange={(value) => setValue(value)}
            />
            <Button onClick={handleCreateChat}>Создать чат</Button>

            <hr className={classes.devider} />

            <HStack maxW align="start">
                <ChatsList
                    chats={chats}
                    setSelectedChat={setSelectedChat}
                    selectedChat={selectedChat}
                />
                {selectedChat ? <MessagesList chat={selectedChat} /> : <Text text="Выберите чат" />}
            </HStack>
        </Page>
    );
});

export default DialogPage;
