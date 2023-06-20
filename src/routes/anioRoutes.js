import express from 'express';
import { getAnioById, getAnios, calcularEstadisticas } from '../controllers/anioController.js';

const router = express.Router();


router.patch('/:id', calcularEstadisticas);
router.get('/', getAnios);
router.get('/:id', getAnioById);


export default router;