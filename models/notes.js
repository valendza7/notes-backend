'use strict';

module.exports = (sequelize, DataTypes) => {
  const notes = sequelize.define("notes", {
    noteid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    note_data: DataTypes.TEXT,
    userid: {
        type: DataTypes.INTEGER,
        references: {
            model: "users",
            key: "userid"
        }
    }
  },{
    timestamps: false
  });

  return notes;
}