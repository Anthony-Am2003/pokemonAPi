const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type:DataTypes.STRING,
      allowNull:false
    },
    life:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate: {
        max: 100, 
      },
    },
    attack:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate: {
        max: 999, 
      },
    },
    defense:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate: {
        max: 999, 
      },
    },
    type: {
      type: DataTypes.ARRAY(DataTypes.JSON), 
      allowNull: false,
    },
    speed: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate: {
        max: 999, 
      },
    },
    weight:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate: {
        max: 999, 
      },
    },

  }, { timestamps: false });
  };
