const { DataTypes } = require('sequelize');
const DB = require('../config/db.connect');

module.exports = DB.define(
    'chats',
    {
        title: {
            type: DataTypes.STRING,
            defaultValue: 'Новый диалог',
        },
        userId: DataTypes.INTEGER,
        folderId: { type: DataTypes.INTEGER, defaultValue: 1 },
    },
    {
        tableName: 'chats',
        timestamps: false,
    },
);
