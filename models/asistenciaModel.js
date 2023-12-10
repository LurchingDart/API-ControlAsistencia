const mongoose = require('mongoose');
const { Schema } = mongoose;

const attendanceSchema = new Schema ({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'student',
        default: undefined
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'group',
        default: undefined
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'subject',
        default: undefined
    },
    status: {
        type: String,
        enum: ['attended', 'excused', 'late', 'absent', 'unexcused', 'unknown'],
        default: 'unknown',
        required: true
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
        }
    }
});

module.exports = (connection) => connection.model('asistencia', attendanceSchema);