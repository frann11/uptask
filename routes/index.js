const express = require('express');
const router = express.Router();

// npm --save express validator PARA SANITIZAR y validar antes de mandar
//importar express validator
const { body } = require ('express-validator/check');

module.exports = function() {

//importar controlador
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController')

// "route" / ruta para el home
// req = request - pedido al servidor
// res = response, lo que devuelve el servidor
// .use -> cualquiera de todos los request devuelve ese codigo
// si pusiera .get -> solo request GET devuelve ese codigo y asi
// res.json -> devuelve JSON
// res.render -> devuelve HTML
router.get('/', authController.usuarioAutenticado,
    proyectosController.proyectosHome);
    
router.get('/nuevo-proyecto',
    authController.usuarioAutenticado, 
    proyectosController.formularioProyecto)
router.post('/nuevo-proyecto', authController.usuarioAutenticado,
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto
    );
   
    // Listar Proyecto 
    router.get('/proyectos/:url' , authController.usuarioAutenticado, proyectosController.proyectoPorUrl)

    // Actualizar el proyecto
    router.get('/proyecto/editar/:id' ,authController.usuarioAutenticado, proyectosController.formularioEditar)
    router.post('/nuevo-proyecto/:id', authController.usuarioAutenticado,
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto
    );
   
    //eliminar Proyecto
    router.delete('/proyectos/:url',authController.usuarioAutenticado, proyectosController.eliminarProyecto);


    // Tareas
    router.post('/proyectos/:url',authController.usuarioAutenticado, tareasController.agregarTarea);

    // Actualizar Tarea
    router.patch('/tareas/:id',authController.usuarioAutenticado,authController.usuarioAutenticado, tareasController.cambiarEstadoTarea);

    // Eliminar Tarea
    router.delete('/tareas/:id',authController.usuarioAutenticado, tareasController.eliminarTarea);

    //Crear nueva cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearCuenta);
    router.get('/confirmar/:correo', usuariosController.confirmarCuenta)

    //iniciar sesion
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    //cerrar sesion
    router.get('/cerrar-sesion', authController.cerrarSesion)

    //reestablecer contraseña
    router.get('/reestablecer', usuariosController.formReestablecerPassword);
    router.post('/reestablecer', authController.enviarToken);
    router.get('/reestablecer/:token', authController.validarToken);
    router.post('/reestablecer/:token', authController.actualizarPassword);
    return router
}
