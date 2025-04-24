import { DataTypes } from "sequelize";
import fichaBanco from "../config/dbconnect.js";
import User from "./User.js";

const Ficha = fichaBanco.define("Ficha", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nameChar: {
    type: DataTypes.STRING,
    allowNull: false
  },
  system: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  file: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  },
  iduser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'iduser'
    }
  }
}, {
  tableName: 'characters',
  timestamps: false
});

// Relacionamento
User.hasMany(Ficha, { foreignKey: 'iduser' });
Ficha.belongsTo(User, { foreignKey: 'iduser' });

export default Ficha;
