
module.exports = function(app){
    app.get('/', function(req, res){
        res.render('index', { title: 'SmsSnd' });

    });

//    app.get('*', function(req, res){
//        res.render('404', { title: 'SmsSnd' });
//    });
}
