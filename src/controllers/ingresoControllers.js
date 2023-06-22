import moment from 'moment';
import Ingreso from '../models/ingresoModel.js';
import Anio from '../models/anioModel.js';

//Obtener todos los ingresos
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

//Obtener el ingreso solicitado
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

//Registrar un ingreso
export const registerIngreso = async (req, res) => {
    try {
        const { name, descripcion, categoria, monto, fecha, cotizacionUsd, comentario } = req.body;

        // Crear un nuevo ingreso
        const estado = 'creado';
        const newIngreso = new Ingreso({ name, descripcion, categoria, monto, fecha, cotizacionUsd, estado, comentario });
        const momentFecha = moment(newIngreso.fecha);
        newIngreso.fecha = momentFecha.format('DD-MM-YYYY');

        /* Obtener el nombre del mes
        const nombreMes = momentFecha.format('MMMM');
        console.log("mes: ", nombreMes);
        // Verificar si existe un ingreso "sueldo" en el mismo mes
        const existingIngreso = await Ingreso.findOne({
            name: 'Sueldo',
            fecha: { $regex: nombreMes, $options: 'i' }
        });

        if (existingIngreso) {
            return res.status(400).json({ message: 'Ya existe un ingreso de sueldo en el mismo mes' });
        }*/

        await newIngreso.save();

        //Iniciar el guardado en el año.
        // Encontrar el documento del año correspondiente
        const anioIngreso = momentFecha.year();

        // Buscar el año correspondiente por su nombre
        const anio = await Anio.findOne({ _id: anioIngreso });

        // El año no existe, crear un nuevo documento de año
        if (!anio) {
            const nuevoAnio = new Anio({ _id: anioIngreso });

            // Crear el mes
            const ingresoMes = {
                nombre: momentFecha.locale('es').format('MMMM'),
                nroMes: (momentFecha.month() + 1),
                ingresos: newIngreso._id
            }
            nuevoAnio.meses.push(ingresoMes);

            await nuevoAnio.save();
        } else {
            // El año existe, insertar el ingreso en su lista de meses, 
            const mesIngreso = anio.meses.find(mes => {
                return mes.nroMes === (momentFecha.month() + 1);
            });
            // EN caso de que no exista el mes, se crea.
            if (!mesIngreso) {

                const ingresoMes = {
                    nombre: momentFecha.locale('es').format('MMMM'),
                    nroMes: (momentFecha.month() + 1),
                    ingresos: []
                }
                ingresoMes.ingresos.push(newIngreso._id);
                anio.meses.push(ingresoMes);
                await anio.save();
            }
            // EN caso de que exista el mes, se inserta el ingreso en la lista.
            else {
                mesIngreso.ingresos.push(newIngreso._id);
                await anio.save();
            }
        }

        // Enviar una respuesta al cliente
        res.status(201).json({ message: 'Se ha creado con exito el registro de ingreso: ' + newIngreso._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al registrar el ingreso' });
    }
};

//Actualizar un ingreso
export const updateIngreso = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, descripcion, categoria, monto, fecha, cotizacionUsd, comentario } = req.body;

        // Buscar y actualizar el ingreso por su ID
        const estado = 'modificado';
        const ingreso = await Ingreso.findByIdAndUpdate(
            id,
            {
                name,
                descripcion,
                categoria,
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

//Eliminar un ingreso, y ademas en la bd de Anio.
export const deleteIngreso = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar el ingreso por su ID
        const ingresoEliminar = await Ingreso.findById(id);
        const fechaSave = JSON.stringify(ingresoEliminar.fecha);
        const momentAnio = moment(fechaSave, 'DD-MM-YYYY').year();
        const momentMes = (moment(fechaSave, 'DD-MM-YYYY').month() + 1);

        if (!ingresoEliminar) {
            return res.status(404).json({ message: 'Ingreso no encontrado' });
        }
        // Buscar y eliminar el ingreso por su ID
        const result = await Ingreso.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Ingreso no encontrado' });
        }
        else {
            const anioIngreso = momentAnio;
            const anio = await Anio.findOne({ _id: anioIngreso });
            let mesIngresoEliminar = anio.meses.find(mes => mes.nroMes === momentMes);

            mesIngresoEliminar.ingresos = mesIngresoEliminar.ingresos.filter((ingresoId) => {
                return (ingresoId.toString() !== id.toString());
            })

            await anio.save();
        }

        // Enviar una respuesta al cliente
        res.status(200).json({ message: 'Fue eliminado el Ingreso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al eliminar el ingreso' });
    }
};
