const { model : PetModel} = require('../models/Pet.model');


const readOnlyPet = async (req, res) => {
    try{
        console.log(req.body);
        const {  name } = req.body;
        const pet = await PetModel.findOne({ name : {$in : name} })
        console.log(pet)

        const response = { status : 'OK', pet}
        res.status(200).json(response)

    }catch (err) {

        console.error(err);
        res.status(500).json(err);

    }
}

module.exports = readOnlyPet;