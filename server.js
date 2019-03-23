const fs = require('fs');
const express = require(`express`);
const bodyParser = require('body-parser');
const mongoose = require(`mongoose`);
mongoose.set('useFindAndModify', false);

const Book = require('./models/book');
const Question = require('./models/question');

const app = express();
const port = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log("Connected to mongo server");
});

mongoose.connect('mongodb://localhost/testbook');

/*
app.post('/api/question', (req, res) => {

    var question = new Question({
        info: req.body.info,
        question: req.body.question,
        answer: req.body.answer
    });

    question.save((err) => {
        if (err) {
            console.error(err);
            res.json({ result: 0 })
            return;
        }
        res.json({ result: 1 });
    })

});
*/

app.post('/api/book', (req, res) => {

    var question = new Question({
        info: req.body.info,
        question: req.body.question,
        answer: req.body.answer
    });

    Book.findOneAndUpdate(
        { tilte: req.body.title},
        { $push: { questions: question}},
        () => { console.log("good!") }
    )

});

app.get('/api/questions/list/:bookId', (req, res) => {
    console.log(req.params.bookId);
    const id = mongoose.Types.ObjectId(req.params.bookId);
    Book.findOne({ _id: id},{ 'questions.info.title': 1, 'questions.info.part': 1, 'questions.info.tagList': {$slice: 3} },(err, questions) => {
        if (err) {
            console.error(err);
            res.json({ result: 0 })
            return;
        }
        console.log(questions);
        res.json(questions);
    })
})

app.get('/api/book', (req, res) => {
    Book.find((err, book) => {
        if (err) {
            console.error(err);
            res.json({ result: 0 })
            return;
        }
        res.json(book);
    })
})


app.listen(port, () => console.log(`Listening on port ${port}`));