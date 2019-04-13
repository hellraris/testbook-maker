const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const resultSchema = new Schema({
    testId: String,
    userId: String,
    solveDate: Date,
    incorrectList: [{questionId: ObjectId, marking: String}]
});

module.exports = mongoose.model('result', resultSchema);