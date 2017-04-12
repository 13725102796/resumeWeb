const express = require('express');
const mysql = require('mysql');
const static = require('express-static');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.urlencoded({extended: false}));

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