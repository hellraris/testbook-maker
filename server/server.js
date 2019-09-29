const log = require('./util/logWriter.js');
const fs = require('fs');
const path = require('path');
const express = require(`express`);
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public')))
app.use(express.static(path.join(__dirname, '../client/build')))

const data = fs.readFileSync('./config/database.json');
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

// bookリスト取得
app.get('/api/:userId/testbook', (req, res) => {

    let sql = "SELECT * FROM TESTBOOK WHERE user_id = ? AND del_flg = 0";
    let userId = req.params.userId;
    let params = [userId];

    connection.query(
        sql, params,
        (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            res.send(results);
        }
    );
});

// Questionリスト取得
app.get('/api/:userId/testbook/:bookId/questions', (req, res) => {

    let sql = "SELECT q.question_id, q.title \
               FROM QUESTION q INNER JOIN TESTBOOK b ON q.testbook_id = b.testbook_id \
               WHERE q.testbook_id = ? AND b.del_flg = 0 AND q.del_flg = 0;";
    let bookId = req.params.bookId;
    let params = [bookId];

    connection.query(
        sql, params,
        (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            res.send(results);
        }
    );
});

// Questions取得
app.get('/api/testbook/:bookId', (req, res) => {

    let sql = "SELECT q.* \
               FROM QUESTION q INNER JOIN TESTBOOK b ON q.testbook_id = b.testbook_id \
               WHERE q.testbook_id = ? AND b.del_flg = 0 AND q.del_flg = 0;";
    let bookId = req.params.bookId;
    let params = [bookId];

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
                    subQuestions: JSON.parse(question.subquestions),
                    explanations: JSON.parse(question.explanations)
                }
            })
            res.send(resData);
        }
    );
});

// Question取得
app.get('/api/testbook/:bookId/question/:questionId', (req, res) => {

    const sql = "SELECT * FROM QUESTION WHERE testbook_id = ? AND question_id = ? AND del_flg = 0";
    const bookId = req.params.bookId;
    const questionId = req.params.questionId;
    let params = [bookId, questionId];

    connection.query(
        sql, params,
        (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            const tmpData = results[0]
            const resData = {
                ...tmpData,
                scripts: JSON.parse(tmpData.scripts),
                subQuestions: JSON.parse(tmpData.subquestions),
                explanations: JSON.parse(tmpData.explanations)
            }

            res.send(resData);
        }
    );
});

// Bookリスト取得 (App)
app.get('/api/app/testbook/list', (req, res) => {

    let sql = "SELECT * FROM TESTBOOK WHERE DEL_FLG = 0";
    connection.query(
        sql,
        (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            res.send(results);
        }
    );
});

// Questionリスト取得 (App)
app.get('/api/app/testbook/:testbookId/', (req, res) => {
    let sql = "SELECT question_id AS questionId, title, tag, favorite, scripts, subquestions as subQuestions, explanations, files \
               FROM QUESTION \
               WHERE TESTBOOK_ID = ? AND DEL_FLG = 0";
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

// Book追加
app.post('/api/book', (req, res) => {

    const sql = "INSERT INTO TESTBOOK VALUES (null, ?, ?, ?, ?, ?, ?, 0, ?, null)";
    const userId = req.body.userId;
    const title = req.body.title;
    const description = req.body.description;
    const tag = req.body.tagList;
    const favorite = 0;
    const version = 0;
    const regDate = new Date();

    const params = [
        userId,
        title,
        description,
        tag,
        favorite,
        version,
        regDate
    ];
    connection.query(sql, params,
        (err, results, fields) => {
            if (err) {
                console.log(err);
            }

            const logMsg = "[BOOK_ADD] UserId: " + userId;
            log(logMsg);

            res.send(results);
        }
    );

});

// Question追加
app.post('/api/book/question', (req, res) => {

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
    const files = null;
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

            const logMsg = "[QUESTION_ADD] BookId: " + testbookId;
            log(logMsg);

            res.send(results);
        }
    );

});

// Book削除
app.put('/api/book/remove', (req, res) => {

    const sql = "UPDATE TESTBOOK SET DEL_FLG = 1 WHERE testbook_id = ?";
    const testbookId = req.body.bookId;

    const params = [
        testbookId
    ];
    connection.query(sql, params,
        (err, results, fields) => {
            if (err) {
                console.log(err);
            }

            const logMsg = "[BOOK_DELETE] BookId: " + testbookId;
            log(logMsg);

            res.send(results);
        }
    );

});

// Question削除
app.put('/api/book/question/remove', (req, res) => {

    const sql = "UPDATE QUESTION SET DEL_FLG = 1 WHERE testbook_id = ? AND question_id = ?";
    const testbookId = req.body.bookId;
    const questionId = req.body.questionId;

    const params = [
        testbookId,
        questionId
    ];
    connection.query(sql, params,
        (err, results, fields) => {
            if (err) {
                console.log(err);
            }

            const logMsg = "[QUESTION_DELETE] BookId: " + testbookId + " QuestionId:" + questionId;
            log(logMsg);

            res.send(results);
        }
    );

});

// 初期アクセス
app.get('*', function (req, res) {
    
    const logMsg = "[ACCESS] url: " + req.url;
    log(logMsg);
    
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));