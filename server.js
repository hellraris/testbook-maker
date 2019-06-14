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
const upload = multer({dest: './upload'})

// Questionリスト取得
app.get('/api/book/:testbookId/question/list', (req, res) => {

    let sql = "SELECT * FROM QUESTION WHERE TESTBOOK_ID = ? AND DEL_FLG = 0";
    let testbookId = req.params.testbookId;
    let params = [testbookId];
    connection.query(
        sql,params,
        (err, rows, fields) => {
            if (err) {
                console.log(err);
            }
            
           let resData = rows.map((qusetion)=>{
               return {
                   ...this,
                   contents: JSON.parse(qusetion.contents)
               }
           })

            res.send(resData);
        }
    );
});

const getQuestionCount = (testbookId) => {

    let sql = "SELECT COUNT(question_id) as total FROM question where TESTBOOK_ID = ? AND del_flg='0'";
    let params = [testbookId];

    connection.query(sql,params,
        (err, result) => {
            console.log('count', result[0].total);
            return result[0].total
        }
    );
}

// Question追加
app.post('/api/book/:testbookId/question/add', (req, res) => {


    let sql = 'INSERT INTO QUESTION VALUES (null, ?, ?, ?, ?, "0", ?, null)';
    let testbookId = req.params.testbookId;
    let version = req.body.version;
    let contents = req.body.contents;
    let regDate = new Date();

    let params = [testbookId, 1, version, contents, regDate];
    console.log('params', params);
    connection.query(sql, params,
        (err, rows, fields) => {
            if (err) {
                console.log(err);
            }
            res.send(rows);
        }
    );

});


app.listen(port, () => console.log(`Listening on port ${port}`));