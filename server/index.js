require('dotenv').config({ path: '../.env' });
const express = require('express');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const DB = require('./config/db.connect');

const { ChatModel, UserModel, MessagesModel, GCTokens } = require('./models');
const { sendMessage } = require('./utils/sendMessage');
const { getAccessToken } = require('./utils/getAccessToken');

const app = express();

function checkAuth(req, res, next) {
    const token = req.cookies[process.env.ACCESS_TOKEN];

    jwt.verify(token, process.env.SECRET_ACCESS, (err, user) => {
        if (err) {
            res.cookie(process.env.ACCESS_TOKEN, '');
            res.cookie(process.env.REFRESH_TOKEN, '');
        }
    });

    return next();
}

app.use(cookieParser());
app.use(checkAuth);
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
        exposedHeaders: ['set-cookie'],
    }),
);
app.use(express.json());

async function StartApp() {
    try {
        // await DB.sync({ force: true });
        await DB.sync({ alter: true });

        app.listen(process.env.SERVER_PORT, () => {
            console.log(
                `Server started on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
            );
        });
    } catch (e) {
        console.log(e);
    }
}

app.post('/sign_in', async (req, res) => {
    try {
        const { login, password } = req.body;

        const candidate = await UserModel.findOne({ raw: true, where: { login } });

        if (!candidate) {
            return res.status(404).json({ message: 'Пользователя с таким логином не найдено' });
        }

        const result = await bcrypt.compare(password, candidate.password);

        if (result) {
            const refreshToken = jwt.sign(
                { id: candidate.id, name: candidate.name },
                process.env.SECRET_REFRESH,
            );
            const accessToken = jwt.sign(
                { id: candidate.id, name: candidate.name },
                process.env.SECRET_ACCESS,
                {
                    expiresIn: '20m',
                },
            );

            await UserModel.update(
                {
                    refresh_token: refreshToken,
                },
                { where: { id: candidate.id } },
            );

            res.cookie('access_token', accessToken);
            res.cookie('refresh_token', refreshToken);

            return res.status(200).json({ ...candidate, password: '' });
        }
        return res.status(404).json({ message: 'Пароль неверный' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Произошло что-то непредвиденное' });
    }
});

app.post('/sign_up', async (req, res) => {
    try {
        const { login, password, name } = req.body;

        const candidate = await UserModel.findAll({ raw: true, where: { login } });
        if (candidate.length) {
            return res.status(404).json({ message: 'Пользователь с таким логином уже существует' });
        }

        const hash = await bcrypt.hash(password, ~~process.env.BCRYPT_HASH);

        if (hash) {
            const refreshToken = jwt.sign({ login, name }, process.env.SECRET_REFRESH);
            const accessToken = jwt.sign({ login, name }, process.env.SECRET_ACCESS, {
                expiresIn: '20m',
            });

            res.cookie('access_token', accessToken);
            res.cookie('refresh_token', refreshToken);

            const user = await UserModel.create({
                login,
                password: hash,
                name,
                refresh_token: refreshToken,
            });
            await ChatModel.create({
                title: 'Новый чат',
                userId: user.id,
            });

            return res.status(200).json({ ...user.dataValues, refresh_token: '', password: '' });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Произошло что-то непредвиденное' });
    }
});

app.post('/refresh_token', async (req, res) => {
    try {
        const { token } = req.body;

        const candidate = await UserModel.findOne({ raw: true, where: { refresh_token: token } });

        if (!candidate) {
            return res.status(403).json({ message: 'Refresh токен мертв!' });
        }

        const refreshToken = jwt.sign(
            { id: candidate.id, name: candidate.name },
            process.env.SECRET_REFRESH,
        );
        const accessToken = jwt.sign(
            { id: candidate.id, name: candidate.name },
            process.env.SECRET_ACCESS,
            {
                expiresIn: '20m',
            },
        );

        await UserModel.update(
            {
                refresh_token: refreshToken,
            },
            { where: { id: candidate.id } },
        );

        res.cookie('access_token', accessToken);
        res.cookie('refresh_token', refreshToken);

        return res.status(200).json({ ...candidate, refresh_token: '', password: '' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Произошло что-то непредвиденное' });
    }
});

app.post('/logout', async (req, res) => {
    try {
        const { userLogin } = req.body;

        await UserModel.update(
            {
                refresh_token: '',
            },
            { where: { login: userLogin } },
        );

        res.cookie('access_token', '');
        res.cookie('refresh_token', '');

        res.status(200).json({ message: 'Успешный выход' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Произошло что-то непредвиденное' });
    }
});

app.get('/chats', async (req, res) => {
    try {
        const { refresh_token } = req.cookies;

        const user = await UserModel.findOne({ raw: true, where: { refresh_token } });

        const chats = await ChatModel.findAll({
            raw: true,
            where: { userId: user.id },
        });

        for (let i = 0; i < chats.length; i += 1) {
            chats[i].messages = await MessagesModel.findAll({
                raw: true,
                where: { chatId: chats[i].id },
                order: [['id', 'ASC']],
            });
        }

        res.status(200).json(chats);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Произошло что-то непредвиденное' });
    }
});

app.post('/create_chat', async (req, res) => {
    try {
        const { title } = req.body;
        const { refresh_token } = req.cookies;

        const user = await UserModel.findOne({ raw: true, where: { refresh_token } });

        if (!user) {
            return res.status(500).json({ message: 'Почему-то не удалось найти Вас' });
        }

        await ChatModel.create({
            title,
            userId: user.id,
        });

        const chats = await ChatModel.findAll({
            raw: true,
            where: { userId: user.id },
        });

        for (let i = 0; i < chats.length; i += 1) {
            chats[i].messages = await MessagesModel.findAll({
                raw: true,
                where: { chatId: chats[i].id },
                order: [['id', 'ASC']],
            });
        }

        return res.status(200).json(chats);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Произошло что-то непредвиденное' });
    }
});

app.post('/send_message', async (req, res) => {
    try {
        const { text, chatId } = req.body;

        await MessagesModel.create({
            role: 'user',
            content: text,
            chatId,
        });

        const messages = await MessagesModel.findAll({
            raw: true,
            where: {
                chatId,
            },
        });
        for (let i = 0; i < messages.length; i += 1) {
            delete messages[i].id;
        }

        const token = await GCTokens.findAll({ raw: true });

        let answer = await sendMessage(messages, token[0]?.access_token || '');
        while (!answer) {
            const new_token = await getAccessToken();
            if (new_token) {
                await GCTokens.destroy({ where: {} });
                await GCTokens.create({ access_token: new_token });
                answer = await sendMessage(messages, new_token);
            }
        }

        await MessagesModel.create({
            role: 'assistant',
            content: answer,
            chatId,
        });

        return res.status(200).json([
            { content: text, role: 'user' },
            { content: answer, role: 'assistant' },
        ]);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Произошло что-то непредвиденное' });
    }
});

app.get('/*', async (req, res) => res.sendFile(path.resolve(__dirname, '../dist/index.html')));

StartApp();
