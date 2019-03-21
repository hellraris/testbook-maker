const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    info: {
        title: String,
        part: String,
        tag: String
    }
});

// export const question = mongoose.model('question', questionSchema);
module.exports = mongoose.model('question', questionSchema);