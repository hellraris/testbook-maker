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
        selections: [SelectionSchema]
    },
    answer: {
        answer: String,
        explanation: String,
        translation: String,
        word: String
    }
});

// export const question = mongoose.model('question', questionSchema);
module.exports = mongoose.model('question', questionSchema);