const { DataTypes } = require('sequelize');
const db            = require('../database');

const Quote = db.define('Quote', {
    id        : {
        type         : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey   : true,
    },
    question  : {
        type     : DataTypes.STRING,
        allowNull: false,
        unique   : true,
    },
    answer    : {
        type     : DataTypes.STRING,
        allowNull: false,
    },
    usageCount: {
        type        : DataTypes.INTEGER,
        defaultValue: 0,
        field       : 'usage_count',
    },
}, {
    tableName : 'quotes',
    timestamps: true,
    createdAt : 'created_at',
    updatedAt : 'updated_at',
});

module.exports = Quote;
