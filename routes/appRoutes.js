import express from 'express'
import{inicio, categoria, noEncontrado, buscador} from '../controllers/appController.js'
import { verifyCsrfToken, regenerateCsrfToken } from '../middlewares/csrfMiddleware.js'
const router = express.Router()

//Pagina de Inicio
router.get('/', inicio)
//Categorias
router.get('/categorias/:id', categoria)

//Pagina 404
router.get('/404', noEncontrado)
//Buscador
router.post('/buscador',verifyCsrfToken, buscador, regenerateCsrfToken)

export default router