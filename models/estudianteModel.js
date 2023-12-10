const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');

const studentSchema = new Schema ({

    studentId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        default: undefined
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return validator.isEmail(v);
            },
            message: props => `${props.value} no es un correo valido!`
        }
    },
    grade: {
        type: Number,
        default: 1,
        required: true
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'group',
        required: true,
        default: undefined
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'subject',
        required: true,
        default: undefined
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'teacher',
        required: true,
        default: undefined
    }

})

module.exports = (connection) => connection.model('student', studentSchema);