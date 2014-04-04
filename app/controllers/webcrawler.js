var cheerio = require('cheerio');
var request = require('request');
var async = require('async');

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