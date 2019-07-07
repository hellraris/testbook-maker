const fs = require('fs');
const express = require(`express`);
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({ dest: './upload' })

// Questionリスト取得
app.get('/api/book/:testbookId/questions', (req, res) => {

    let sql = "SELECT question_id AS questionId, title, tag, favorite, scripts, subquestions AS subQuestions, explanations, files FROM QUESTION WHERE TESTBOOK_ID = ? AND DEL_FLG = 0";
    let testbookId = req.params.testbookId;
    let params = [testbookId];
    connection.query(
        sql, params,
        (err, results, fields) => {
            if (err) {
                console.log(err);
            }

            let resData = results.map((question) => {
                return {
                    ...question,
                    scripts: JSON.parse(question.scripts),
                    subQuestions: JSON.parse(question.subQuestions),
                    explanations: JSON.parse(question.explanations),
                    files: JSON.parse(question.files)
                }
            })

            res.send(resData);
        }
    );
});


// webからbookリスト取得
app.get('/api/:userId/testbook', (req, res) => {

    let sql = "SELECT * FROM TESTBOOK WHERE user_id = ?";
    let userId = req.params.userId;
    let params = [userId];

    connection.query(
        sql,params,
        (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            console.log(results);
            res.send(results);
        }
    );
});

// webからQuestionリスト取得
app.get('/api/:userId/testbook/:bookId/questions', (req, res) => {

    console.log("hiru?", req.params.bookId);

    let sql = "SELECT title FROM question WHERE testbook_id = ?";
    let bookId = req.params.bookId;
    let params = [bookId];

    connection.query(
        sql,params,
        (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            console.log(results);
            res.send(results);
        }
    );
});


// webからQuestions取得
app.get('/api/testbook/:bookId', (req, res) => {

    let sql = "SELECT * FROM question WHERE testbook_id = ?";
    let bookId = req.params.bookId;
    let params = [bookId];

    connection.query(
        sql,params,
        (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            console.log(results);
            let resData = results.map((question) => {
                return {
                    ...question,
                    scripts: JSON.parse(question.scripts),
                    subQuestions: JSON.parse(question.subquestions),
                    explanations: JSON.parse(question.explanations)
                }
            })
            res.send(resData);
        }
    );
});

// appからQuestionリスト取得
app.get('/api/app/testbook/list', (req, res) => {

    let sql = "SELECT * FROM TESTBOOK WHERE DEL_FLG = 0";
    connection.query(
        sql,
        (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            console.log(results);
            res.send(results);
        }
    );
});


// appからQuestionリスト取得
app.get('/api/app/testbook/:testbookId/', (req, res) => {
    let sql = "SELECT question_id AS questionId, title, tag, favorite, scripts, subquestions as subQuestions, explanations, files FROM QUESTION WHERE TESTBOOK_ID = ? AND DEL_FLG = 0";
    let testbookId = req.params.testbookId;
    let params = [testbookId];
    connection.query(
        sql, params,
        (err, results, fields) => {
            if (err) {
                console.log(err);
            }

            let resData = results.map((question) => {
                return {
                    ...question,
                    scripts: JSON.parse(question.scripts),
                    subQuestions: JSON.parse(question.subQuestions),
                    explanations: JSON.parse(question.explanations),
                    files: JSON.parse(question.files)
                }
            })

            res.send(resData);
        }
    );
});

const getQuestionCount = (testbookId) => {

    let sql = "SELECT COUNT(question_id) as total FROM question where TESTBOOK_ID = ? AND del_flg='0'";
    let params = [testbookId];

    connection.query(sql, params,
        (err, result) => {
            console.log('count', result[0].total);
            return result[0].total
        }
    );
}

// Question追加
app.post('/api/book/question/add', (req, res) => {

    const sql = "INSERT INTO QUESTION VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, null)";
    const testbookId = req.body.testbookId;
    const title = req.body.title;
    const tagList = req.body.tagList;
    const favorite = 0;
    const version = 0;
    const questionOrder = 0;
    const scripts = req.body.scripts;
    const subQuestions = req.body.subQuestions;
    const explanations = req.body.explanations;
    const files = req.body.files;
    const regDate = new Date();

    const params = [
        testbookId,
        title,
        tagList,
        favorite,
        version,
        questionOrder,
        scripts,
        subQuestions,
        explanations,
        files,
        regDate
    ];
    connection.query(sql, params,
        (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            res.send(results);
        }
    );

});

// order機能(保留)
/*
app.get('/api/book/:testbookId/questionOrder', (req, res) => {
    let sql = "SELECT question_order from testbook where testbook_id = ? AND DEL_FLG = 0";
    let testbookId = req.params.testbookId;
    let params = [testbookId];
    connection.query(
        sql,params,
        (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            res.send(results[0]);
        }
    );
});


// QuestionOrder更新
app.post('/api/book/:testbookId/questionOrder', (req, res) => {

    let sql = 'UPDATE TESTBOOK set question_order = ? where testbook_id =?';
    let testbookId = req.params.testbookId;
    let newQuestionOrlder = JSON.stringify(req.body);
    let params = [newQuestionOrlder, testbookId];
    connection.query(sql, params,
        (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            res.send(results);
        }
    );

});
*/

app.listen(port, () => console.log(`Listening on port ${port}`));