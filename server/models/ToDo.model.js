const { Schema, model } = require ('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const ToDoSchema = new Schema ({
    nombre: {
        type : String,
        required: [true, 'Nombre es requerido'],
        minlength: [3, 'Nombre debe tener al menos 3 caracteres'],
        unique : true
    },
    descripcion : {
        type : String,
        required: [true, 'Descripcion es requerido'],
        minlength: [3, 'Descripcion debe tener al menos 3 caracteres'],
    },
    email: {
        type : String,
        required : [true, 'Email es requerido'],
    }
});

ToDoSchema.plugin(uniqueValidator,{ message: 'Tarea registrada anteriormente' });
const ToDo = model('ToDo', ToDoSchema);

module.exports = { 
    schema : ToDoSchema,
    model : ToDo
}

