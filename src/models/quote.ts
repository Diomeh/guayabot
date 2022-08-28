import { DataTypes, Model, InitOptions } from 'sequelize/types';
import { db } from '@/core';

class Quote extends Model {
    declare id          : number;
    declare question    : string;
    declare answer      : string;
    declare usageCount  : number;
    declare updatedAt   : Date;
    declare createdAt   : Date;
};

const attrs: InitOptions<Quote> = {
    sequelize : db,
    tableName : 'quotes',
    timestamps: true,
    createdAt : 'created_at',
    updatedAt : 'updated_at',
};

Quote.init({
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
        type     : DataTypes.TEXT,
        allowNull: false,
    },
    usageCount: {
        type        : DataTypes.INTEGER,
        defaultValue: 0,
        field       : 'usage_count',
    },
}, attrs);

export default Quote;
