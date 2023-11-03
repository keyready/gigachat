require('dotenv').config({ path: '../.env' });
const express = require('express');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const DB = require('./config/db.connect');

const { ChatModel, UserModel } = require('./models');

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

        const candidate = await UserModel.findOne({ raw: true, where: { username: login } });

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

        const candidate = await UserModel.findAll({ raw: true, where: { username: login } });
        if (candidate.length) {
            return res.status(404).json({ message: 'Пользователь с таким логином уже существует' });
        }

        const hash = await bcrypt.hash(password, ~~process.env.BCRYPT_HASH);

        if (hash) {
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

            res.cookie('access_token', accessToken);
            res.cookie('refresh_token', refreshToken);

            const user = await UserModel.create({
                username: login,
                password: hash,
                name,
                refresh_token: refreshToken,
            });

            return res.status(200).json({ ...user.dataValues, refresh_token: '', password: '' });
        }
    } catch (e) {
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
        const { id } = req.body;

        await UserModel.update(
            {
                refresh_token: '',
            },
            { where: { id } },
        );

        res.cookie('access_token', '');
        res.cookie('refresh_token', '');

        res.status(200).json({ message: 'Успешный выход' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Произошло что-то непредвиденное' });
    }
});

app.get('/*', async (req, res) => res.sendFile(path.resolve(__dirname, '../dist/index.html')));

StartApp();
