const mongoose = require('mongoose');
const { Schema } = mongoose;

const attendanceSchema = new Schema ({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'group',
        required: true
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'subject',
        required: true
    },
    status: {
        type: String,
        enum: ['attended', 'excused', 'late', 'absent', 'unknown'],
        default: 'unknown',
    },
    comment: {
        type: String,
        default: ''
    },
    dateData: {
        day: {
            type: Number,
            default: new Date().getDate()
        },
        month: {
            type: Number,
            default: new Date().getMonth() + 1
        },
        year: {
            type: Number,
            default: new Date().getFullYear()
        },
        hour: {
            type: Number,
            default: new Date().getHours()
        },
        minute: {
            type: Number,
            default: new Date().getMinutes()
        },
        second: {
            type: Number,
            default: new Date().getSeconds()
        }
    }
});

module.exports = (connection) => connection.model('asistencia', attendanceSchema);