const express = require('express');
const static = require('express-static');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');


var app = express();
// 将url解析成json格式
app.use(bodyParser.urlencoded({extended: false}));

//上传文件的路径
app.use(multer({dest: './static/upload'}).any());

//签名认证
app.use(cookieParser('asdcascasxcasac'));

//加密 (使用闭包，防止污染环境变量)
(function () {
    var arr = [];
    for(var i=0; i<10000; i++){
        arr.push('keys_' + Math.random());
    }
    app.use(cookieSession({
        name: 'sess_id', keys: arr, maxAge: 20*3000*30
    }));
})();

//输出什么 （html）
app.set('view engine', 'html');

//模版文件在哪 （./template）
app.set('views', './template');

//使用哪一种模版文件 （ejs）
app.engine('html', consolidate.ejs);

// 引入route分支
app.use('/admin/', require('./route/admin/index.js')());
app.use('/',require('./route/web/index.js')());
app.listen(8080);

app.use(static('./static/'));