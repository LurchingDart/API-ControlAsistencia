const mongoose = require('mongoose');
const { Schema } = mongoose;

const subjectSchema = new Schema ({

    name: {
        type: String,
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'teacher'
    }
})

module.exports = (connection) => connection.model('subject', subjectSchema);