var request = require('request'); //拉取网页内容
var cheerio = require('cheerio'); //实现jQuery功能
var iconv = require('iconv-lite'); //把GBK转成utf8
var url = require('url');

/*
 * res响应对象
 * body 响应体
 *
 */
exports.category = function (url, callback) {
    request({url:url,encoding:null}, function (err, res, body) {
        if (err){
            return console.log(err);
        }
        //把GBK编码的BUFFER转成UTF8编码的字符串
        body = iconv.decode(body, 'gbk');
        //根据响应体转成DOM对象
        var $ = cheerio.load(body);
        var items = [];
        //找到所有的分类的A标签并进行转换
        $('.hd .title a').each(function () {
            var $me = $(this);
            var item = {
                name: $me.text().trim(), //trim去空格
                url: $me.attr('href')
            };

                var params = regParams(item.url);
                item.id = params.b;
                items.push(item);

        });
        callback(null, items);
    });
}

function regParams(url) {
   var obj = {};
   var reg = /([^?&=]*)=([^?&=]*)/g;
   url.replace(reg, function (src, $1, $2) {
       obj[$1] = $2;
   })
    return obj;
}

exports.article = function (url,cid, callback) {
    request({url:url,encoding:null}, function (err, res, body) {
        if (err){
            return console.log(err);
        }
        //把GBK编码的BUFFER转成UTF8编码的字符串
        body = iconv.decode(body, 'gbk');
        //根据响应体转成DOM对象
        var $ = cheerio.load(body);
        var items = [];
        //找到所有的分类的A标签并进行转换
        $('.keyword a').each(function () {
            var $me = $(this);
            var item = {
                name: $me.text().trim(), //trim去空格
                url: $me.attr('href'),
                cid: cid
            };
            if (item.name !='search'){
                items.push(item);
            }

        });
        callback(null, items);
    });
}

