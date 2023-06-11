
import express from 'express';
import ingresoRoutes from './routes/ingresoRoutes.js';

const app = express();

// Configurar middlewares
app.use(express.json());

// Configurar rutas
app.use('/ingreso', ingresoRoutes);


export default app 