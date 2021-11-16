const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

console.log(process.env.SECRETKEY)

const { model : UserModel} = require('../models/User.model');

const loginUser = async ( req, res) =>{
    try{

        console.log(req.body);
        const { email:inputEmail, password:inputPassword } = req.body
        try{
            const {fullName, email, password, _id } = await UserModel.findOne({ email : {$in : inputEmail}})

            const payload = {
                id: _id
              };
            
            const userToken = jwt.sign(payload, process.env.SECRETKEY);

            if(email){
                const match = await bcrypt.compare(inputPassword, password);
                if(match){
                    res.cookie("usertoken", userToken, process.env.SECRETKEY, {
                        httpOnly: true,
                    })
                    const response = { status : 'OK', mensaje: "usuario logeado correctamente", fullName : fullName}
                    res.status(200).json(response)
                }else{
                    res.status(200).json({status : 'ERROR', mensaje : "Contraseña incorrecta, intente nuevamente"})
                }
            }
        }catch (err){
            res.status(200).json({status : 'ERROR', mensaje : "Usuario no registado"})
        }
    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

module.exports = loginUser;