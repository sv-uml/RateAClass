"use strict";

module.exports = function(sequelize, DataTypes) {
    var School = sequelize.define("School", {
        id: {
            type: DataTypes.INTEGER(11),
            field: 'id',
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            field: 'name'
        },
        location: {
            type: DataTypes.STRING(255),
            field: 'location'
        },
        unique: {
            type: DataTypes.STRING(255),
            field: 'unique_str'
        }
    },
    {
        timestamps: false,
        tableName: 'school',
    });
    return School;
};