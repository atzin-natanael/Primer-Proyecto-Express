import express from 'express'
import {body} from 'express-validator'
import {admin, crear, guardar, agregarImagen, almacenarImagen, editar, guardarCambios, eliminar, mostrarPropiedad, enviarMensaje} from '../controllers/propiedadesController.js'
import { ExpressValidator } from 'express-validator'
import { verifyCsrfToken, regenerateCsrfToken } from '../middlewares/csrfMiddleware.js'
import protegerRuta from '../middlewares/protegerRuta.js'
import upload from '../middlewares/subirImagen.js'
import identificarUsuario from '../middlewares/identificarUsuario.js'
const router = express.Router()

router.get('/mis-propiedades',protegerRuta, admin)
router.get('/propiedades/crear',protegerRuta, crear)
router.post('/propiedades/crear', verifyCsrfToken, protegerRuta,
    body('titulo').notEmpty().withMessage('El titulo es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripción no debe ir vacia')
        .isLength({max: 200}).withMessage('La descripcion es muy larga'),
    body('categoria').isNumeric().withMessage('Selecciona una categoria'),
    body('precio').isNumeric().withMessage('Selecciona un rango de precios'),
    body('habitaciones').isNumeric().withMessage('Selecciona la cantidad de habitaciones'),
    body('estacionamiento').isNumeric().withMessage('Selecciona la cantidad de estacionamientos'),
    body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
    guardar,
    regenerateCsrfToken
)
router.get('/propiedades/agregar-imagen/:id',protegerRuta, agregarImagen)
router.post('/propiedades/agregar-imagen/:id', verifyCsrfToken, protegerRuta,
    upload.single('imagen'),
    almacenarImagen,
    regenerateCsrfToken
)
router.get('/propiedades/editar/:id', protegerRuta, editar)
router.post('/propiedades/editar/:id', verifyCsrfToken, protegerRuta,
    body('titulo').notEmpty().withMessage('El titulo es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripción no debe ir vacia')
        .isLength({max: 200}).withMessage('La descripcion es muy larga'),
    body('categoria').isNumeric().withMessage('Selecciona una categoria'),
    body('precio').isNumeric().withMessage('Selecciona un rango de precios'),
    body('habitaciones').isNumeric().withMessage('Selecciona la cantidad de habitaciones'),
    body('estacionamiento').isNumeric().withMessage('Selecciona la cantidad de estacionamientos'),
    body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
    guardarCambios,
    regenerateCsrfToken
)
router.post('/propiedades/eliminar/:id',
    verifyCsrfToken,
    protegerRuta,
    eliminar,
    regenerateCsrfToken
)
//Area publica
router.get('/propiedad/:id', identificarUsuario, mostrarPropiedad)
router.post('/propiedad/:id', identificarUsuario, 
    body('mensaje').isLength({min:10}).withMessage('El mensaje no puede ir vacio o es muy corto'),
    enviarMensaje)
export default router