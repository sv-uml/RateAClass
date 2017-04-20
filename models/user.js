"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER(11),
            field: 'id',
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            field: 'name'
        },
        email: {
            type: DataTypes.STRING(255),
            field: 'email'
        },
        password: {
            type: DataTypes.STRING(255),
            field: 'password'
        },
        datetime: {
            type: DataTypes.STRING(255),
            field: 'datetime'
        }
    },
    {
        timestamps: false,
        tableName: 'user',
    });
    return User;
};