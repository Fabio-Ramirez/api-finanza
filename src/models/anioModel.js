import mongoose from 'mongoose';
import Ingreso from '../models/ingresoModel.js';

const anioSchema = new mongoose.Schema({
    _id: { type: Number, required: true, unique: true },
    descripcion: { type: String, required: false },
    total: { type: Number, required: false },
    totalAdicional: { type: Number, required: false },
    promedioMensual: { type: Number, required: false },
    promedioMensualAdicionales: { type: Number, required: false },
    valorSueldoUsd: { type: Number, required: false },
    variacionAcumulada: { type: Number, required: false },
    comentario: { type: String, required: false },
    ingresos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingreso' }]
});

const Anio = mongoose.model('Anio', anioSchema);


export default Anio;