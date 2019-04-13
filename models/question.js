const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const SelectionSchema = new Schema({
    id: String,
    selection: String
})

const questionSchema = new Schema({
    bookId: ObjectId,
    info: {
        title: String,
        part: String,
        tagList: [String]
    },
    question: {
        script: String,
        selections: [SelectionSchema],
        answer: String
    },
    answer: {
        explanation: String,
        translation: String,
        word: String
    }
});

module.exports = mongoose.model('question', questionSchema);