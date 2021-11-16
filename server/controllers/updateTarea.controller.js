const { model : ToDoModel} = require('../models/ToDo.model');

const updateTarea = async (req, res) => {
    try {
        console.log(req.body);
        const { email, nombre } = req.body;
        try{

            const tarea  = await ToDoModel.findOneAndUpdate(
                { nombre : {$in : nombre},email : {$in : email}},
                req.body, 
                { new: true });
            await tarea.save();
            console.log(tarea)

            const response = { status : 'OK', mensaje : "Tarea actualizada correctamente"}
            res.status(200).json(response)
            
        }catch (err){
            console.error(err);
            res.status(500).json(err);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};



module.exports = updateTarea;