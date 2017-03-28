"use strict";

module.exports = function(sequelize, DataTypes) {
    var Class = sequelize.define("Class", {
        id: {
            type: DataTypes.INTEGER(11),
            field: 'id',
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            field: 'name'
        },
        description: {
            type: DataTypes.STRING(999),
            field: 'description'
        },
        school: {
            type: DataTypes.INTEGER(11),
            field: 'school'
        }
    },
    {
        timestamps: false,
        tableName: 'class',
    });
    return Class;
};