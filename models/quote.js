const { DataTypes } = require('sequelize');
const db            = require('../database');

// noinspection JSCheckFunctionSignatures
const Quote = db.define('Quote', {
    id        : {
        type         : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey   : true,
    },
    question  : {
        type     : DataTypes.STRING,
        notNull  : true,
        allowNull: false,
    },
    answer    : {
        type     : DataTypes.STRING,
        notNull  : true,
        allowNull: false,
    },
    usageCount: {
        type   : DataTypes.INTEGER,
        default: 0,
        field  : 'usage_count',
    },
}, {
    tableName : 'quotes',
    timestamps: true,
    createdAt : 'created_at',
    updatedAt : 'updated_at',
});

module.exports = Quote;
