// create a express application
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();

const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const config = {
    host: 'db',
    user: 'root',
    password: 'qweqwep',
    database: 'nodedb'
}

const mysql = require('mysql');
const connection = mysql.createConnection(config);

app.get('/', function(req, res) {

    const sql = `SELECT * FROM people`;

    connection.query(sql, function(error, results) {
        if (error) throw error;

        res.render('index.ejs', { peoples: results });
    });
   
});

app.post('/people', function(req, res) {

    console.log('req details', req.body);

    const name = req.body.name;

    const sql = `INSERT INTO people(name) VALUES('${name}')`;

    connection.query(sql, function(error, results, fields) {
        if (error) throw error;
        res.redirect('/');
    });
});

server.listen(3000, function() {
    console.log('Server listening at port 3000');
})
