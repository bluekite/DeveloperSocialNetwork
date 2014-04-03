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


    app.get('/test',function(req,res){
        var http =  require('http');
        var url = "http://foolkite.github.io";
        http.get(url, function(res) {
            var source = "";
            //通过 get 请求获取网页代码 source
            res.on('data', function(data) {
                source += data;
            });
            //获取到数据 source，我们可以对数据进行操作了!
            res.on('end', function() {
                console.log(source);
                var cheerio = require('cheerio'),
                $ = cheerio.load(source);
                $('h1').addClass('welcome');
                console.log($.children);

            });
        }).on('error', function() {
                console.log("获取数据出现错误");
            });

        res.send({"result":1});
    })

//    app.get('*', function(req, res){
//        res.render('404', { title: 'SmsSnd' });
//    });

}
