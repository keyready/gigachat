const { DataTypes } = require('sequelize');
const DB = require('../config/db.connect');

module.exports = DB.define(
    'messages',
    {
        role: DataTypes.STRING,
        content: DataTypes.TEXT,
        chatId: DataTypes.INTEGER,
    },
    {
        tableName: 'messages',
        timestamps: false,
    },
);
