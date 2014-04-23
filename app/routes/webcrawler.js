var cheerio = require('cheerio');
var request = require('request');
var async = require('async');
var fs = require('fs');


module.exports = function(app){

    app.get('/crawler',function(req, res){
        request('http://foolkite.github.io/', function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                res.send({'result': $('p').html()});
            }else{
                res.send({'result': error.message});
            }
        });
    });


    app.get('/weibocrawler',function(req, res){
        request('http://weibo.com/u/2047869935', function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                res.send({'result': html});
            }else{
                res.send({'result': error.message});
            }
        });
    });

//    app.get('/tss/numbers',function(req, res){
//
//        fs.readFile('/Users/gaojintian/workspace/SmsSnd/public/files/tss.html', 'utf8' ,function(err, html){
//            if(err){
//                var result = {
//                    'status' : 0,
//                    'result' : err.message
//                }
//                res.send(result);
//            }else{
//                var address = [];
//                jsdom.env(
//                    html,
//                    ["http://code.jquery.com/jquery.js"],
//                    function(errors, window){
//                        window.$("a").filter(function() {
//                            return this.href.match(/^mailto:/);
//                        }).each(function(){
//                            address.push(window.$(this).attr('href').split(':')[1]);
//                            console.log(window.$(this).attr('href').split(':')[1]);
//                        });
//
//                    var result = {
//                        'status' : 1,
//                        'address': address.join(',')
//                    }
//                    res.send(result);
//                });
//            }
//        });
//
//
//
//    });

    app.get('/toycrawler',function(req, res){


        var url_base = 'http://trac.edgewall.org/changeset/';
        var min = 7752;
        var max = 12648;
        var text = '';

        var q = async.queue(function (task, callback){
            toy(task.url);
            callback(null,toy_callback(text,res));
        }, 2);

        for ( var i =min ; i<=7800 ; i++){
            q.push( { url: url_base+i});
        };

    });


    var toy = function(url){

        request( url, function (error, response, html) {
            var $ = cheerio.load(html);
            if (!error && response.statusCode == 200) {
                console.log(url);
                console.log($('span.trac-author').html());
            }else{
                console.log(url);
                console.log(' !!    error');
            }
        });
    }

    var toy_callback = function(text,res){
        res.send(text);
    }

}