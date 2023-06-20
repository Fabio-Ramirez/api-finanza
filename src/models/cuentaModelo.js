import mongoose from 'mongoose';
import Ingreso from '../models/ingresoModel.js';

const cuentaSchema = new mongoose.Schema({
    _id: { type: Number, required: true, unique: true },
    alias: { type: Number, required: false },
    tipo: {
        type: String,
        required: true,
        enum: ['bancaria', 'efectivo', 'mercado pago']
    },
    cvu: { type: Number, required: false },
    descripcion: { type: String, required: false },
    saldo: { type: Number, required: false }
});

const Cuenta = mongoose.model('Cuenta', cuentaSchema);


export default Cuenta;