const { DataTypes } = require('sequelize');
const DB = require('../config/db.connect');

module.exports = DB.define(
    'users',
    {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        name: DataTypes.STRING,
    },
    {
        tableName: 'users',
        timestamps: false,
    },
);
