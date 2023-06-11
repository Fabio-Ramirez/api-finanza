import express from 'express';
import { getIngresos, getIngresoById, registerIngreso, updateIngreso, deleteIngreso } from '../controllers/ingresoControllers.js';

const router = express.Router();


// Ruta para obtener todos los ingresos

router.get('/', getIngresos);
router.get('/:id', getIngresoById);
router.post('/', registerIngreso);
router.patch('/:id', updateIngreso);
router.delete('/:id', deleteIngreso);

export default router;