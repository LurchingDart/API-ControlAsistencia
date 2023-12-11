const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');

const adminSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return validator.isEmail(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    role : {
        type: String,
        default: 'admin'
    }
})

module.exports = (connection) => connection.model('admin', adminSchema);