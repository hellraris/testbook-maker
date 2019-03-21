const fs = require('fs');
const express = require(`express`);
const bodyParser = require('body-parser');
const mongoose = require(`mongoose`);

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

app.get('/api/question', (req, res) => {
    Question.find((err, question) => {
        if (err) {
            console.error(err);
            res.json({ result: 0 })
            return;
        }
        res.json(question);
    })
})


app.listen(port, () => console.log(`Listening on port ${port}`));