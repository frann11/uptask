const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Referencia al modelo donde queremos autenticar
const Usuarios = require('../models/Usuarios');

//local strategy - login con credfenciales propias (usuario y passport)
passport.use(
    new LocalStrategy(
        // por default passport espera un usuario y password
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({
                    where: { 
                        email,
                        activo: 1
                    }
                });

                //El usuario existe, password incorrecto
                if(!usuario.verificarPassword(password)){
                    return done(null, false, {
                        message : 'Password Incorrecto'
                    })
                }

                // El email existe y el password es incorrecto
                return done(null,usuario);
                
            } catch (error) {
                // ese usuario no existe
                return done(null, false, {
                    message : 'Esa cuenta no existe'
                })
                
            }
        }
    )
);
//serializar el usuario
passport.serializeUser((usuario,callback) => {
    callback(null, usuario);
});

//deserializar el usuario
passport.deserializeUser((usuario,callback) => {
    callback(null, usuario);
});

//exportar
module.exports = passport;
