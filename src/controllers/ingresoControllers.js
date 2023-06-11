import Ingreso from '../models/ingresoModel.js';

export const getIngresos = async (req, res) => {
    try {
        // Obtener todos los ingresos de la base de datos
        const ingresos = await Ingreso.find();

        // Enviar una respuesta al cliente
        res.status(200).json(ingresos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener los ingresos' });
    }
};

export const getIngresoById = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar un ingreso por su ID en la base de datos
        const ingreso = await Ingreso.findById(id);
        if (!ingreso) {
            return res.status(404).json({ message: 'Ingreso no encontrado' });
        }

        // Enviar una respuesta al cliente
        res.status(200).json(ingreso);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener el ingreso' });
    }
};

export const registerIngreso = async (req, res) => {
    try {
        const { name, descripcion, tipo, monto, fecha, cotizacionUsd, comentario } = req.body;

        // Verificar si ya existe un ingreso con el mismo
        /*const existingIngreso = await Ingreso.findOne({ email });
        if (existingIngreso) {
            return res.status(400).json({ message: 'Ya existe un ingreso con el mismo correo electrónico' });
        }*/

        // Crear un nuevo ingreso
        const estado = 'creado';
        const newIngreso = new Ingreso({ name, descripcion, tipo, monto, fecha, cotizacionUsd, estado, comentario });
        await newIngreso.save();


        // Enviar una respuesta al cliente
        res.status(201).json({ message: 'Se ha creado con exito el registro de ingreso: ', newIngreso });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al registrar el ingreso' });
    }
};

export const updateIngreso = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, descripcion, tipo, monto, fecha, cotizacionUsd, comentario } = req.body;

        // Buscar y actualizar el ingreso por su ID
        const estado = 'modificado';
        const ingreso = await Ingreso.findByIdAndUpdate(
            id,
            {
                name,
                descripcion,
                tipo,
                monto,
                fecha,
                cotizacionUsd,
                comentario,
                estado
            },
            { new: true } // Devuelve el ingreso actualizado
        );

        if (!ingreso) {
            return res.status(404).json({ message: 'Ingreso no encontrado' });
        }

        // Enviar una respuesta al cliente
        res.status(200).json({ message: 'Ingreso actualizado', ingreso });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al actualizar el ingreso' });
    }
};

export const deleteIngreso = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar y eliminar el ingreso por su ID
        const result = await Ingreso.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Ingreso no encontrado' });
        }

        // Enviar una respuesta al cliente
        res.status(200).json({ message: 'Fue eliminado el Ingreso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al eliminar el ingreso' });
    }
};
