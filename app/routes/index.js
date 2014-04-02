/*
    Web Page control
 */


module.exports = function(app){
    app.get('/', function(req, res){
    	console.log('index');
        res.render('index', { title: 'SmsSnd' });

    });

    app.get('/test', function(req, res){
    	console.log('test');
        res.render('index', { title: 'SmsSnd' });

    });

//    app.get('*', function(req, res){
//        res.render('404', { title: 'SmsSnd' });
//    });

}
