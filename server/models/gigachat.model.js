const { DataTypes } = require('sequelize');
const DB = require('../config/db.connect');

module.exports = DB.define(
    'gctokens',
    {
        access_token: DataTypes.TEXT,
    },
    {
        tableName: 'gctokens',
        timestamps: false,
    },
);
