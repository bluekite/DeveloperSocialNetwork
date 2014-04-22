var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'network'
});


module.exports = function(app){

    app.post('/mysql/test', function(req, res){
        connection.connect();

        connection.query('SELECT * from filebug', function(err, rows, fields) {
            if (err) throw err;

            console.log('The solution is: ', rows);
        });

        connection.end();
    });

    app.get('/graph', function(req, res){
        res.render('graph');
    });


}