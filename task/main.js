var read = require('./read');
var save = require('./save');
var async = require('async');
var uri = 'http://top.baidu.com/category?c=10&fr=topindex';
//串行执行
var categories = [];
var articles = [];
async.series([
    //得到分类列表
  function (done) {
      read.category('http://top.baidu.com/category?c=10&fr=topindex', function (err, list) {
          categories = list;
          done(err);
      });
  },
    //把分类的列表保存到数据库中
    function (done) {
        save.category(categories, done);
    },
    function (done) {
        async.forEach(categories, function (category, next) {
            read.article('http://top.baidu.com/buzz?b='+category.id+'&c=10&fr=topcategory_c10',category.id,function (err, list) {
                //把每个分类下面的文章列表全部加在一起
                articles = articles.concat(list);
                next();
            })
        },done);
    },
    function (done) {
        save.article(articles, done);
    }
],function (err, result) {
    if (err){
        console.log(err);
    }else{
        console.log('所有的任务完成')
    }

});
