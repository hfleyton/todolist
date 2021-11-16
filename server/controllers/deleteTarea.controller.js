const { model : ToDoModel} = require('../models/ToDo.model');

const deleteTarea = async (req, res) => {
    try{
        console.log(req.body);
        const { email, nombre } = req.body;
        const resp = await ToDoModel.deleteOne({ nombre : {$in : nombre},email : {$in : email}})
        console.log(resp)

        const response = { status : 'OK', mensaje : `La tarea ${nombre} fue completada exitosamente`}
        res.status(200).json(response)

    }catch (err) {

        console.error(err);
        res.status(500).json(err);

    }
}

module.exports = deleteTarea;