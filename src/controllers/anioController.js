import moment from 'moment';
import Anio from '../models/anioModel.js';

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

export const registerAnio = async (req, res) => {
    try {

        // Enviar una respuesta al cliente
        res.status(201).json({ message: 'Se ha creado con exito el registro de anio: ', });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al registrar el anio' });
    }
}



