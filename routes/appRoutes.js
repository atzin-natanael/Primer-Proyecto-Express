import express from 'express';
import { inicio } from '../controllers/appController.js';
const router = express.Router();

router.get('/inicio', inicio);

export default router;