const Sequelize = require('sequelize');
const db = require('../config/db');
const slug = require('slug')
const shortid = require('shortid')

const Proyectos = db.define('proyectos',{
        id : {
            type: Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },

        nombre : Sequelize.STRING(100),
        // como solo paso un valor puedo borrar llaves y 'type'

        url: Sequelize.STRING(100),
}, {
    hooks:{
        //sequelize hooks referencia
        beforeCreate(proyecto){
            console.log('Antes de Insertar en la BD');
            const url = slug(proyecto.nombre).toLowerCase();
            proyecto.url = `${url}-${shortid.generate()}`

        }
    }

});

module.exports = Proyectos;