const mongoose = require("mongoose");

const urlDataBase = process.env.DB_LINK;

const connectMongo = async () =>{
	try{
		await mongoose.connect(urlDataBase,{
			useNewUrlParser : true,
			useUnifiedTopology : true,
			useCreateIndex : true,
			useFindAndModify : false
		})
		console.log("Conexion exitosa a mongoDB")
	} catch (err) {
		console.error(err)
		process.exit(1)
	}
}

module.exports = connectMongo;