
import express from 'express';
import ingresoRoutes from './routes/ingresoRoutes.js';
import anioRoutes from './routes/anioRoutes.js';


const app = express();

// Configurar middlewares
app.use(express.json());

// Configurar rutas
app.use('/ingreso', ingresoRoutes);
app.use('/anio', anioRoutes);


export default app 