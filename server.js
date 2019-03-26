const fs = require('fs');
const express = require(`express`);
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require(`mongoose`);
mongoose.set('useFindAndModify', false);

const Book = require('./models/book');
const Question = require('./models/question');

const app = express();
const port = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/client/build'));

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log("Connected to mongo server");
});

mongoose.connect('mongodb://localhost/testbook');

app.get('/', (req, res) => {
    console.log(__dirname);
    res.sendFile(__dirname + '/client/build/index.html');
});


app.post('/api/book/:bookId/question/add', (req, res) => {

    var question = new Question({
        bookId: req.params.bookId,
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
        console.log("successfully saved")
        res.json("successfully saved");
    })

});

/*
app.post('/api/book/:bookId/question/add', (req, res) => {

    var question = new Question({
        _id: mongoose.Types.ObjectId(),
        info: req.body.info,
        question: req.body.question,
        answer: req.body.answer
    });

    Book.updateOne(
        { _id: req.params.bookId },
        { $push: { questions: question } },
        (err) => { 
            if (err) {
                console.log(err);
            }
            console.log("push successfully") }
    )

});
*/

app.post('/api/book/:bookId/question/:questionId/update', (req, res) => {

    const bookId = mongoose.Types.ObjectId(req.params.bookId);
    const questionId = mongoose.Types.ObjectId(req.params.questionId);

    Question.updateOne(
        { '_id': questionId, 'bookId': bookId},
        { $set:  req.body  },
        (err) => { 
            if (err) {
                console.log(err);
                res.json({ result: 0 });
            }
            console.log("successfully updated");
            res.json("successfully updated"); 
        }
    )

});

app.delete('/api/book/:bookId/question/:questionId', (req, res) => {

    const bookId = mongoose.Types.ObjectId(req.params.bookId);
    const questionId = mongoose.Types.ObjectId(req.params.questionId);

    Question.remove(
        { '_id': questionId, 'bookId': bookId},
        (err) => { 
            if (err) {
                console.log(err);
                res.json({ result: 0 });
            }
            console.log("successfully deleted");
            res.json("successfully deleted");
        }
    )

});

app.get('/api/book/:bookId/question/list', (req, res) => {

    const id = mongoose.Types.ObjectId(req.params.bookId);

    Question.find({ bookId: id },
        {
            '_id': 1,
            'info.title': 1,
            'info.part': 1,
            'info.tagList': 1, //{ $slice: 3 },
            'question': 1
        },
        (err, questions) => {
            if (err) {
                console.error(err);
                res.json({ result: 0 })
                return;
            }
            res.json(questions);
        })

})

/*
app.get('/api/book/:bookId/question/:questionId', (req, res) => {

    const bookId = mongoose.Types.ObjectId(req.params.bookId);
    const questionId = mongoose.Types.ObjectId(req.params.questionId);

    Book.findOne({ "_id": bookId }, { "questions": { $elemMatch: { "_id": questionId } } }, (err, book) => {
        if (err) {
            console.error(err);
            res.json({ result: 0 })
            return;
        }
        console.log(book.questions[0]);
        res.json(book.questions[0]);
    })

})
*/

app.get('/api/book/:bookId/question/:questionId', (req, res) => {

    const bookId = mongoose.Types.ObjectId(req.params.bookId);
    const questionId = mongoose.Types.ObjectId(req.params.questionId);

    Question.findOne({ "_id": questionId, "bookId": bookId }, (err, question) => {
        if (err) {
            console.error(err);
            res.json({ result: 0 })
            return;
        }
        res.json(question);
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