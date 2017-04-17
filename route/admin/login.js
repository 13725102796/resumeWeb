const express = require('express');
const mysql = require('mysql');
const common = require('../../libs/common');

const db = mysql.createPool({
    host: 'localhost',
    user: 'nodejs',
    password: 'nodejs',
    database:'resume',
    port: 3306
});

module.exports = function () {
    var router = express.Router();

    router.get('/', (req, res)=> {
        res.render('page/login.ejs', {});

    })

    router.post('/', (req, res)=>{
        var username = req.body.username;
        var Password = req.body.password + common.MD5_SUFFIX;
        var password = common.md5(Password);

        db.query(`SELECT * FROM admin_table WHERE username='${username}'`, (err, data)=>{
            if(err){
                res.status(500).send('database error').end();
            }else{
                if(data.length==0){
                    res.status(400).send('no this admin').end();
                }else{
                    if(data[0].password==password){
                        //success
                        req.session['admin_id']=data[0].ID;
                        res.redirect('/admin/');
                    }else{
                        res.status(400).send('this password is incorrect').end();
                    }
                }
            }
        })
    });

    return router;
}