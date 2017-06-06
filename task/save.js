var mysql = require('mysql');
var async = require('async');
var pool = mysql.createPool({
    host:'localhost',
    user: 'root',
    password:'',
    database:'crawl'
});
//把分类列表存入数据库
exports.category = function (list, callback) {
   async.forEach(list, function (item,cb) {
       pool.query('replace into category(id, name, url) values(?,?,?)',[item.id,item.name,item.url],function (err, result) {
           console.error(err);
           cb();
       });
   },callback);
};

//把文章列表存入数据库
exports.article = function (list, callback) {
    async.forEach(list, function (item,cb) {
        pool.query('replace into article(name, url, cid) values(?,?,?)',[item.name,item.url,item.cid],cb);
    },callback);
};



