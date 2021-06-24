// sequelize.org getting started
const { Sequelize } = require('sequelize');
//extraer valores de variables.env
require('dotenv').config({ path: 'variables.env'})
// Option 1: Passing a connection URI

const db = new Sequelize(process.env.BD_NOMBRE, 
    process.env.BD_USER, 
    process.env.BD_PASS,
        {
        host: process.env.BD_HOST,
        dialect: 'mysql',
        
        define:{
            timestamps: false
        },
  });

  module.exports = db