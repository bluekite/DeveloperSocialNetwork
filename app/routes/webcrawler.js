var cheerio = require('cheerio');
var request = require('request');
var async = require('async');
var fs = require('fs');
var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');
var http = require('http');


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

    app.get('/stocks/show', function(req, res){
        var html = fs.readFileSync('/Users/gaojintian/workspace/seniorproject/public/stock/table.html');
        res.send('<table>'+html+'</table>');
    });

    app.get('/stocks/jrj',function(req, res){
        var url_header = 'http://stock.jrj.com.cn/share,';
        var url_article = ',zyyw';
        var url_footer = '.shtml';
        var text;

        var list = fs.readFileSync('/Users/gaojintian/workspace/seniorproject/public/stock/selectedstock.txt');
        list = list.toString().split('\n');
        var selectedlist = [];
        var selectedname = [];

        for(var i = 0;i<136;i++){
            selectedlist.push(list[i].split('\t')[0]);
            selectedname.push(list[i].split('\t')[1]);
        }


        var q = async.queue(function (task, callback){
            single_stock_year(task.url,task.year,task.code,task.name);
            callback(null,stock_year_callback(text,res));
        }, 1);

        //q.push({url:'http://stock.jrj.com.cn/share,601918,zyyw_7.shtml'});
        //q.push({url:'http://stock.jrj.com.cn/share,601918,zyyw_5.shtml'});
        //q.push({url:'http://stock.jrj.com.cn/share,000656,zyyw_3.shtml'});
        //q.push({url:'http://stock.jrj.com.cn/share,601918,zyyw.shtml'});

        for( var i = 0; i<133;i++){
            q.push({url:url_header+selectedlist[i]+url_article+url_footer,year:2013,code:selectedlist[i],name:selectedname[i]});
            q.push({url:url_header+selectedlist[i]+url_article+'_3'+url_footer,year:2012,code:selectedlist[i],name:selectedname[i]});
            q.push({url:url_header+selectedlist[i]+url_article+'_5'+url_footer,year:2011,code:selectedlist[i],name:selectedname[i]});
            q.push({url:url_header+selectedlist[i]+url_article+'_7'+url_footer,year:2010,code:selectedlist[i],name:selectedname[i]});

        }

//        for ( var i =min ; i<=7800 ; i++){
//            q.push( { url: url_base+i});
//        };

    });

    var single_stock_year = function(url,year,code,name){

        if( (Number(code) >= 300344 && Number(code) < 600082 ) || ( Number(code) == 603008 ) || ( Number(code) == 603333 ) && year =='2011' ){
            url = 'http://stock.jrj.com.cn/share,'+code+',zyyw_4.shtml';
        }
        if( (Number(code) >= 300344 && Number(code) < 600082 ) || ( Number(code) == 603008 ) || ( Number(code) == 603333 ) && year =='2010' ){
            url = 'http://stock.jrj.com.cn/share,'+code+',zyyw_5.shtml';
        }
        http.get(url, function(html){

            html.setEncoding('binary');
            var source = "";
            html.on('data', function(data) {
                source += data;
            });
            html.on('end', function() {
                console.log(url+' start');
                var buf = new Buffer(source, 'binary');
                var str = iconv.decode(buf, 'GBK');
                var $ = cheerio.load(str);
                //console.log($('table[class=tab1]').next().html());
                var table = $('table[class=tab1]').next().html().split(/<th rowspan="[0-9]{1,2}">按行业分类<\/th>/)[1].split(/<th rowspan="[0-9]{1,2}">按产品分类<\/th>/)[0];
                table.replace(/<\/tr>\s{0,}<td/,'</tr><td></td><td');
                fs.appendFileSync('public/stock/table.html','<th>'+code+'</th>'+'<th>'+year+'</th>'+'<th>'+name+'</th></tr>'+table);
                console.log(url+' success');
            }).on("error", function() {
                    console.log(rul+' error');
                    //res.send(' error');
                });



        });

    }

    var stock_year_callback = function(text, res){
        res.send(text);
    }

}