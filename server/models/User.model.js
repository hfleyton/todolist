const { Schema, model } = require ('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const UserSchema = new Schema ({
    email: {
        type : String,
        required : [true, 'E-Mail es requerido'],
        unique : true
    },
    fullName : {
        type : String,
        required : [true, 'Nombre es requerido']
    },
    password : {
        type : String,
        required : [true, 'Password es requerido']
    }
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next();
      });
  });

UserSchema.plugin(uniqueValidator);
const User = model('user', UserSchema);

module.exports = { 
    schema : UserSchema,
    model : User
}

