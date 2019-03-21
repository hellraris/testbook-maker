const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SelectionSchema = new Schema({
    id: String,
    selection: String,
    answer: Boolean
})

const questionSchema = new Schema({
    info: {
        title: String,
        part: String,
        tagList: [String]
    },
    question: {
        script: String,
        selections: [SelectionSchema]
    },
    answer: {
        explanation: String,
        translation: String,
        word: String
    }
});

// export const question = mongoose.model('question', questionSchema);
module.exports = mongoose.model('question', questionSchema);