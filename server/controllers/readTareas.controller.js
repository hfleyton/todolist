const { model : ToDoModel} = require('../models/ToDo.model');


const readTareas = async (req, res) => {
    const { email:inputEmail } = req.body
    try{
        const allTareas = await ToDoModel.find({ email : {$in : inputEmail}})
        console.log(allTareas)

        const response = { status : 'OK', allTareas: allTareas}
        res.status(200).json(response)

    }catch (err) {

        console.error(err);
        res.status(500).json(err);

    }
}

module.exports = readTareas;