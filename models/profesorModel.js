const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');

const teacherSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    lastName: {
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
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'subject',
        default: undefined
    }],
    groups: [{
        type: Schema.Types.ObjectId,
        ref: 'group',
        default: undefined
    }],
    role : {
        type: String,
        default: 'teacher'
    }
})

module.exports = (connection) => connection.model('teacher', teacherSchema);