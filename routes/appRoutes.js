import express from 'express';
import { inicio, crearPedido } from '../controllers/appController.js';
const router = express.Router();

router.get('/catalogo', inicio);
router.get('/crearPedido', crearPedido);

export default router;