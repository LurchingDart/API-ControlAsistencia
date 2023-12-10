const mongoose = require('mongoose');
const { Schema } = mongoose;

const testSchema = new Schema ({

    name: {
        type: String,
        required: true
    }
})

module.exports = (connection) => connection.model('test', testSchema);