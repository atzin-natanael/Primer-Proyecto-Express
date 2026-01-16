import express from 'express';
import { inicio, crearPedido } from '../controllers/appController.js';
import protegerRuta from '../middlewares/protegerRuta.js';
const router = express.Router();

router.get('/catalogo', protegerRuta, inicio);
router.get('/crearPedido', protegerRuta, crearPedido);

export default router;