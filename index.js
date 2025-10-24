import express from 'express'
import cookieParser from 'cookie-parser'
import usuarioRoutes from './routes/usuarioRoutes.js'
import propiedadesRoutes from './routes/propiedadesRoutes.js'
import db from './config/db.js'
import { csrfMiddleware, verifyCsrfToken } from './middlewares/csrfMiddleware.js'
import { errorHandler, notFound } from './middlewares/errorHandler.js'
import helmet from 'helmet'
//Crear la app
const app = express()
//Habilitar Pug (view engine)
//Habilita la lectura de datos de formulario
app.use(express.urlencoded({extended: true}))

app.use(cookieParser())

//Conexion DB
try{
    await db.authenticate()
    db.sync()
    console.log('Conexion correcta a la db')
}catch(error){
    console.log(error)
}

//csrf middleware
app.use(helmet())
app.use(csrfMiddleware)
app.use(verifyCsrfToken)

app.set('view engine', 'pug')
app.set('views', './views')
//CarpetaPublica
app.use(express.static('public'))
//Routing
app.use('/auth',usuarioRoutes)
app.use('/', propiedadesRoutes)


app.use(notFound)
app.use(errorHandler)

//Definir un  puerto
const port = process.env.PORT || 3000
app.listen(port, () =>{
    console.log(`El servidor esta funcionando en el puerto ${port}`)
});