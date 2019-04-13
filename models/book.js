const question = require('./question');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new Schema({
    _id: ObjectId,
    questions: [question.schema]
});

module.exports = mongoose.model('book', bookSchema);