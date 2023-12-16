const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema ({
    number: {
        type: String,
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'teacher',
        required: true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'student',
        default: undefined
    }],
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'subject',
        default: undefined
    }],
    attendances: [{
        type: Schema.Types.ObjectId,
        ref: 'attendance',
        default: undefined
    }]
});

module.exports = (connection) => connection.model('group', groupSchema);