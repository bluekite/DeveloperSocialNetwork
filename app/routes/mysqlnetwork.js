var mysql = require('mysql');
var fs = require('fs');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'network'
});


module.exports = function(app){

    app.post('/mysql/network/filebug', function(req, res){
        connection.connect();

        connection.query('SELECT * from filebug', function(err, rows, fields) {
            if(err){
                throw err;
                res.send({'error':err.message});
            }else{
                var data = JSON.stringify(rows);
                fs.writeFile('app/models/filebug.json', data, function(err){
                    if(err){
                        throw err;
                        res.send({'error':err.message});
                    }else{
                        res.send({
                            'success': true,
                            'filebug': rows
                        });
                    }
                })
            }
        });
        if(connection) connection.end();

    });
//    app.post('/mysql/network/filedeveloper', function(req, res){
//        connection.connect();
//
//        connection.query('SELECT * from filedeveloper', function(err, rows, fields) {
//            if(err){
//                throw err;
//                res.send({'error':err.message});
//            }else{
//                var data = JSON.stringify(rows);
//                fs.writeFile('app/models/filedeveloper.json', data, function(err){
//                    if(err){
//                        throw err;
//                        res.send({'error':err.message});
//                    }else{
//                        res.send({
//                            'success': true
//                        });
//                    }
//                })
//            }
//        });
//        if(connection) connection.end();
//
//    });
//
//    app.post('/mysql/network/network_developer_work_v04', function(req, res){
//        connection.connect();
//
//        connection.query('SELECT * from network_developer_work_v04', function(err, rows, fields) {
//            if(err){
//                throw err;
//                res.send({'error':err.message});
//            }else{
//                var data = JSON.stringify(rows);
//                fs.writeFile('app/models/network_developer_work_v04.json', data, function(err){
//                    if(err){
//                        throw err;
//                        res.send({'error':err.message});
//                    }else{
//                        res.send({
//                            'success': true
//                        });
//                    }
//                })
//            }
//        });
//        if(connection) connection.end();
//
//    });
//
//    app.post('/mysql/network/network_developer_work_v08', function(req, res){
//        connection.connect();
//
//        connection.query('SELECT * from network_developer_work_v08', function(err, rows, fields) {
//            if(err){
//                throw err;
//                res.send({'error':err.message});
//            }else{
//                var data = JSON.stringify(rows);
//                fs.writeFile('app/models/network_developer_work_v08.json', data, function(err){
//                    if(err){
//                        throw err;
//                        res.send({'error':err.message});
//                    }else{
//                        res.send({
//                            'success': true
//                        });
//                    }
//                })
//            }
//        });
//        if(connection) connection.end();
//
//    });
//
//    app.post('/mysql/network/network_developer_work_v10', function(req, res){
//        connection.connect();
//
//        connection.query('SELECT * from network_developer_work_v10', function(err, rows, fields) {
//            if(err){
//                throw err;
//                res.send({'error':err.message});
//            }else{
//                var data = JSON.stringify(rows);
//                fs.writeFile('app/models/network_developer_work_v10.json', data, function(err){
//                    if(err){
//                        throw err;
//                        res.send({'error':err.message});
//                    }else{
//                        res.send({
//                            'success': true
//                        });
//                    }
//                })
//            }
//        });
//        if(connection) connection.end();
//
//    });
//
//    app.post('/mysql/network/network_developer_work_v14', function(req, res){
//        connection.connect();
//
//        connection.query('SELECT * from network_developer_work_v14', function(err, rows, fields) {
//            if(err){
//                throw err;
//                res.send({'error':err.message});
//            }else{
//                var data = JSON.stringify(rows);
//                fs.writeFile('app/models/network_developer_work_v14.json', data, function(err){
//                    if(err){
//                        throw err;
//                        res.send({'error':err.message});
//                    }else{
//                        res.send({
//                            'success': true
//                        });
//                    }
//                })
//            }
//        });
//        if(connection) connection.end();
//
//    });
//
//    app.post('/mysql/network/network_developer_work_v18', function(req, res){
//        connection.connect();
//
//        connection.query('SELECT * from network_developer_work_v18', function(err, rows, fields) {
//            if(err){
//                throw err;
//                res.send({'error':err.message});
//            }else{
//                var data = JSON.stringify(rows);
//                fs.writeFile('app/models/network_developer_work_v18.json', data, function(err){
//                    if(err){
//                        throw err;
//                        res.send({'error':err.message});
//                    }else{
//                        res.send({
//                            'success': true
//                        });
//                    }
//                })
//            }
//        });
//        if(connection) connection.end();
//
//    });
//
//    app.post('/mysql/network/network_developer_work_v20', function(req, res){
//        connection.connect();
//
//        connection.query('SELECT * from network_developer_work_v20', function(err, rows, fields) {
//            if(err){
//                throw err;
//                res.send({'error':err.message});
//            }else{
//                var data = JSON.stringify(rows);
//                fs.writeFile('app/models/network_developer_work_v20.json', data, function(err){
//                    if(err){
//                        throw err;
//                        res.send({'error':err.message});
//                    }else{
//                        res.send({
//                            'success': true
//                        });
//                    }
//                })
//            }
//        });
//        if(connection) connection.end();
//
//    });
//
//    app.post('/mysql/network/network_developer_work_v24', function(req, res){
//        connection.connect();
//
//        connection.query('SELECT * from network_developer_work_v24', function(err, rows, fields) {
//            if(err){
//                throw err;
//                res.send({'error':err.message});
//            }else{
//                var data = JSON.stringify(rows);
//                fs.writeFile('app/models/network_developer_work_v24.json', data, function(err){
//                    if(err){
//                        throw err;
//                        res.send({'error':err.message});
//                    }else{
//                        res.send({
//                            'success': true
//                        });
//                    }
//                })
//            }
//        });
//        if(connection) connection.end();
//
//    });
//
//    app.post('/mysql/network/network_file_logic_v04', function(req, res){
//        connection.connect();
//
//        connection.query('SELECT * from network_file_logic_v04', function(err, rows, fields) {
//            if(err){
//                throw err;
//                res.send({'error':err.message});
//            }else{
//                var data = JSON.stringify(rows);
//                fs.writeFile('app/models/network_file_logic_v04.json', data, function(err){
//                    if(err){
//                        throw err;
//                        res.send({'error':err.message});
//                    }else{
//                        res.send({
//                            'success': true
//                        });
//                    }
//                })
//            }
//        });
//        if(connection) connection.end();
//
//    });
//
//    app.post('/mysql/network/network_file_logic_v08', function(req, res){
//        connection.connect();
//
//        connection.query('SELECT * from network_file_logic_v08', function(err, rows, fields) {
//            if(err){
//                throw err;
//                res.send({'error':err.message});
//            }else{
//                var data = JSON.stringify(rows);
//                fs.writeFile('app/models/network_file_logic_v08.json', data, function(err){
//                    if(err){
//                        throw err;
//                        res.send({'error':err.message});
//                    }else{
//                        res.send({
//                            'success': true
//                        });
//                    }
//                })
//            }
//        });
//        if(connection) connection.end();
//
//    });

    app.post('/mysql/network/:table', function(req, res){

        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'network'
        });
        connection.connect();

        connection.query('SELECT * from '+req.params.table, function(err, rows, fields) {
            if(err){
                throw err;
                res.send({'error':err.message});
            }else{
                var data = JSON.stringify(rows);
                fs.writeFile('app/models/'+req.params.table+'.json', data, function(err){
                    if(err){
                        throw err;
                        res.send({'error':err.message});
                    }else{
                        res.send({
                            'success': true
                        });
                    }
                })
            }
        });
        connection.end();

    });

    app.post('/mysql/read/test', function(req, res){
        fs.readFile('app/models/filebug.json', 'utf-8',function(err, data){
            console.log(JSON.parse(data)[0]);
            res.send({'data':JSON.parse(data)});
        });
    });

    app.get('/graph', function(req, res){
        res.render('graph');
    });


}