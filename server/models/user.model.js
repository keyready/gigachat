const { DataTypes } = require('sequelize');
const DB = require('../config/db.connect');

module.exports = DB.define(
    'users',
    {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        refresh_token: DataTypes.TEXT,
    },
    {
        tableName: 'users',
        timestamps: false,
    },
);
