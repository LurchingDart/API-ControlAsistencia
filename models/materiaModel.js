const mongoose = require('mongoose');
const { Schema } = mongoose;

const subjectSchema = new Schema ({
    name: {
        type: String,
        required: true
    }
});

module.exports = (connection) => connection.model('subject', subjectSchema);