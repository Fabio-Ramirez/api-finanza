import mongoose from 'mongoose';
import Anio from '../models/anioModel.js';

//Obtener todos los años
export const getAnios = async (req, res) => {
    try {
        // Obtener todos los anios de la base de datos
        const anios = await Anio.find();

        // Enviar una respuesta al cliente
        res.status(200).json(anios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener los anios' });
    }
};

//Obtener el año
export const getAnioById = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar un anio por su ID en la base de datos
        const anio = await Anio.findById(id);
        if (!anio) {
            return res.status(404).json({ message: 'Anio no encontrado' });
        }

        // Enviar una respuesta al cliente
        res.status(200).json(anio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener el anio' });
    }
};

//Calcular la estadisticas
export const calcularEstadisticas = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar el documento de Anio por su ID y populando el campo 'ingresos'
        const anio = await Anio.findById(id).populate('ingresos').exec();

        if (!anio) {
            console.log('No se encontró un documento de Anio con el ID proporcionado');
            return;
        }

        // Acceder a los ingresos asociados al documento de Anio
        const ingresos = anio.ingresos;
        if (!ingresos) {
            console.log('No hay ingresos en este año');
            return;
        }

        //Se realizan las estadisticas
        let total = 0;
        let totalMontoAdicional = 0;

        ingresos.forEach((ingreso) => {
            if (ingreso.name.toLowerCase() !== 'sueldo') {
                totalMontoAdicional += ingreso.monto;
            }
            total += ingreso.monto;
        });

        //console.log('Total de montos:', total, totalMontoAdicional, totalMontoAdicional + total);
        const estadisticas = {
            total: total,
            totalMontoAdicional: totalMontoAdicional
        }
        // Enviar una respuesta al cliente
        res.status(201).json({ message: 'Se ha calculado las estadisticas', estadisticas });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al registrar el anio' });
    }
}






