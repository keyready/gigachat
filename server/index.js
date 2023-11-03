require('dotenv').config({ path: '../.env' });
const express = require('express');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const DB = require('./config/db.connect');

const { ChatModel, UserModel } = require('./models');

const app = express();

app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(cors());
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

        const candidate = await UserModel.findAll({ raw: true, where: { username: login } });
        if (!candidate.length) {
            return res.status(404).json({ message: 'Пользователя с таким логином не найдено' });
        }

        bcrypt
            .compare(password, candidate[0].password)
            .then((isComparable) => {
                if (isComparable) {
                    return res.status(200).json({...candidate[0], password: ''});
                }
                return res.status(404).json({ message: 'Пароль неверный' });
            })
            .catch((err) => {
                throw new Error(err);
            });
    } catch (e) {
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

        bcrypt
            .hash(password, ~~process.env.BCRYPT_HASH)
            .then(async (hash) => {
                const user = await UserModel.create({ username: login, password: hash, name });
                return res.status(200).json({...user.dataValues, password: ''});
            })
            .catch((err) => {
                throw new Error(err);
            });
    } catch (e) {
        return res.status(500).json({ message: 'Произошло что-то непредвиденное' });
    }
});

app.get('/*', async (req, res) => {
    return res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

StartApp();
