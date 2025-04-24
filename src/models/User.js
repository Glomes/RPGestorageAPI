import { DataTypes } from "sequelize";
import fichaBanco from "../config/dbconnect.js";

const User = fichaBanco.define("User", {
  iduser: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'user',
  timestamps: false
});

export default User;
