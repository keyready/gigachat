const { DataTypes } = require('sequelize');
const DB = require('../config/db.connect');

module.exports = DB.define(
    'chats',
    {
        title: {
            type: DataTypes.STRING,
            defaultValue: 'Новый диалог',
        },
        userId: DataTypes.STRING,
    },
    {
        tableName: 'chats',
        timestamps: false,
    },
);
