'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var InfoSchema = new Schema({
    bookId: ObjectId,
    title: String
});

var ScriptSchema = new Schema({
    subtitle: String,
    contents: String
});

var ExplanationSchema = new Schema({
    subtitle: String,
    contents: String
});

var QuestionSchema = new Schema({
    subtitle: String,
    selections: [String],
    answers: [Number]
});

var QuestionSetSchema = new Schema({
    info: InfoSchema,
    scripts: [ScriptSchema],
    questions: [QuestionSchema],
    explanations: [ExplanationSchema]
});

// export const question = mongoose.model('question', questionSchema);
module.exports = mongoose.model('question', QuestionSetSchema);