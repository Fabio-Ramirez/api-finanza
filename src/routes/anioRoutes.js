import express from 'express';
import { getAnioById, getAnios, registerAnio } from '../controllers/anioController.js';

const router = express.Router();


router.post('/', registerAnio);
router.get('/', getAnios);
router.get('/:id', getAnioById);


export default router;