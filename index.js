
const { response } = require('express');
const express = require('express');
const routes = require('./routes')
const path = require('path')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('./config/passport')

//importar las variables
require('dotenv').config({ path: 'variables.env'})

// helpers con algunas funciones
const helpers = require('./helpers')

//crear conexion a BD
const db = require('./config/db');
const { request } = require('http');

//importar el modelo
require('./models/Proyectos')
require('./models/Tareas')
require('./models/Usuarios')

db.sync()
    .then(() => console.log('conectado al servidor'))
    .catch(error => console.log(error))


//crear app de exress
const app = express();

//cargar archivos estaticos
app.use(express.static('public'))

//habilitar pug
app.set('view engine','pug')


// habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended:true}))



//añadir carpeta de las vistas
app.set('views',path.join(__dirname, './views'))

// agregar flash messages 
app.use(flash());

app.use(cookieParser());
// sesiones nos permiten navegar entre distintas paginas sin volvernos a autenticar
app.use(session({
    secret: 'supersecreto',
    resave: 'false',
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

// pasar var dump
app.use((req,res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    next();
});


/*
    {
        producto: "Libro",
        precio: 20
    },
    {
        producto: "Computadora",
        precio: 10000
    },
]*/

app.use('/', routes() )


//Servidor y puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '8080';

app.listen(port,host, () => {
    console.log('El servidor esta funcionando')
})