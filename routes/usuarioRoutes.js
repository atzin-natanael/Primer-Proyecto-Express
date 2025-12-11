import express from 'express'
import { formularioLogin, autenticar, cerrarSesion, formularioRegistro, registrar, confirmar, formularioOlvidePassword, resetPassword, comprobarToken, nuevoPassword} from '../controllers/usuarioController.js'
import { verifyCsrfToken, regenerateCsrfToken } from '../middlewares/csrfMiddleware.js'
const router = express.Router()
//Rounting
router.get('/login', formularioLogin)
router.post('/login', verifyCsrfToken, autenticar, regenerateCsrfToken)
//cerrar sesion
router.post('/cerrar-sesion',verifyCsrfToken, cerrarSesion, regenerateCsrfToken)
router.get('/registro', formularioRegistro)
router.post('/registro', verifyCsrfToken, registrar, regenerateCsrfToken)
router.get('/confirmar/:token', confirmar)
router.get('/olvide-password', formularioOlvidePassword)
router.post('/olvide-password', verifyCsrfToken, resetPassword, regenerateCsrfToken)
//almacena el nuevo  password
router.get('/olvide-password/:token', comprobarToken)
router.post('/olvide-password/:token',verifyCsrfToken, nuevoPassword, regenerateCsrfToken)
export default router