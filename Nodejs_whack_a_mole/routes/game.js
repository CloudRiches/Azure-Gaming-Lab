const mysql = require('mysql');
const config = require('../config');

class Game {

    async Index(req, res) {
        // res.render('index', { title: 'Express' });
        res.render('index');
    }

    async WriteResult(req, res) {
        var conn = new mysql.createConnection(config);
        var item = req.body;
        conn.connect(
            function (err) {
                if (err) {
                    console.log("!!! Cannot connect !!! Error:");
                    throw err;
                }
                else {
                    console.log("Connection established.");
                    addData();
                }
            });
        function addData() {
            conn.query('INSERT INTO Result (`datetime`, username, score) VALUES (?, ?, ?);', [new Date(), item.username, item.score],
                function (err, results, fields) {
                    if (err) throw err;
                    console.log('Inserted ' + results.affectedRows + ' row(s).');
                    res.send(true);
                })

            conn.end(function (err) {
                if (err) throw err;
                else console.log('Done.')
            });
        }
    }

    async ReadResult(req, res) {
        var item = req.body;

        var conn = new mysql.createConnection(config);
        conn.connect(
            function (err) {
                if (err) {
                    console.log("!!! Cannot connect !!! Error:");
                    throw err;
                }
                else {
                    console.log("Connection established.");
                    getData();
                }
            });
        function getData() {
            conn.query('SELECT * FROM Result WHERE username = ? ORDER BY `datetime` DESC', [item.username],
                function (err, results, fields) {
                    if (err) throw err;
                    else {
                        res.json(results);
                    }
                })

            conn.end(function (err) {
                if (err) throw err;
                else console.log('Done.')
            });

        }
    }

    async DeleteResult(req, res) {
        var conn = new mysql.createConnection(config);
        var item = req.body;
        conn.connect(
            function (err) {
                if (err) {
                    console.log("!!! Cannot connect !!! Error:");
                    throw err;
                }
                else {
                    console.log("Connection established.");
                    addData();
                }
            });
        function addData() {
            conn.query('DELETE FROM Result WHERE username = ?', [item.username],
                function (err, results, fields) {
                    if (err) throw err;
                    console.log('Delete ' + results.affectedRows + ' row(s).');
                    res.send(true);
                })

            conn.end(function (err) {
                if (err) throw err;
                else console.log('Done.')
            });
        }
    }
}

module.exports = Game;