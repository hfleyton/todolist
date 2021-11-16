const { model : UserModel} = require('../models/User.model');

const controller = async ( req, res) =>{
    try{
        console.log(req.body);
        const { email , fullName , password } = req.body

        const user = new UserModel( { email , fullName , password } );
        await user.save();

        const response = { status : 'OK', mensaje: "Usuario creado correctamente"}
        res.status(200).json(response)

    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

module.exports = controller;