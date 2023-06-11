import mongoose from 'mongoose';

const ingresoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    descripcion: { type: String, required: true },
    fecha: { type: Date, required: false },
    monto: { type: Number, required: true },
    cotizacionUsd: { type: Number, required: false },
    totalDolares: { type: Number, required: false },
    valorSueldoUsd: { type: Number, required: false },
    inflacion: { type: Number, required: false },
    comentario: { type: String, required: false },
    tipo: { type: String, required: false },  /* sueldo, adicional*/
    estado: {
        type: String,
        required: true,
        enum: ['creado', 'modificado', 'eliminado']
    }, /*creado, modificado*/
});

const Ingreso = mongoose.model('Ingreso', ingresoSchema);


export default Ingreso;