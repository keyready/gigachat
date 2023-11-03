import { Page } from 'widgets/Page/Page';
import { useEffect, useState } from 'react';
import { Text } from 'shared/UI/Text';
import { Input } from 'shared/UI/Input';
import { Button } from 'shared/UI/Button';

interface IForm {
    login?: string;
    password?: string;
}

const MainPage = () => {
    useEffect(() => {
        document.title = 'GigaChat';
    }, []);

    const [formData, setFormData] = useState<IForm>({});

    const login = async () => {
        fetch('http://localhost:5000/sign_in', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            });
    };

    const register = async () => {
        fetch('http://localhost:5000/sign_up', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            });
    };

    return (
        <Page>
            <Input
                value={formData.login}
                onChange={(value) => setFormData({ ...formData, login: value })}
            />
            <Input
                value={formData.password}
                onChange={(value) => setFormData({ ...formData, password: value })}
            />
            <Button onClick={login}>Отправить</Button>
            <Button onClick={register}>Зарегистрировать</Button>
        </Page>
    );
};

export default MainPage;
