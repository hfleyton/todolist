const { model : ToDoModel} = require('../models/ToDo.model');

const createTarea = async (req, res) => {
    try {
        console.log(req.body);
        const { email, nombre , descripcion } = req.body;
        const tarea = new ToDoModel( { email, nombre , descripcion } );
        await tarea.save();

        const response = { status : 'OK', mensaje : `La tarea ${nombre} fue agregada exitosamente`}
        res.status(200).json(response)

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};



module.exports = createTarea;