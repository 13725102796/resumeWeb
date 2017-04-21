const express = require('express');
const mysql = require('mysql');
const pathLib = require('path');
const fs = require('fs');

const db = mysql.createPool({
    host: 'localhost',
    user: 'nodejs',
    password: 'nodejs',
    database: 'resume',
    port: 3306
});

module.exports = function () {
    var router = express.Router();

    router.get('/', (req, res) => {
        if (req.query.id) {
            if (req.query.id != 'all') {
                db.query(`DELETE FROM blog_table WHERE ID=${req.query.id}`, (err, data) => {
                    if (err) {
                        res.status(500).send('database error').end();
                    } else {
                        res.redirect('/admin/blog');
                    }
                });
            } else {
                //全部删除逻辑
                res.send('您暂时还没有权限删除全部数据').end();
            }
        } else {
            db.query(`SELECT * FROM blog_table`, (err, experienceData) => {
                if (err) {
                    res.status(500).send('database error').end();
                } else {
                    res.render('page/blog.ejs', { experienceData });
                }
            });
        }
    });

    router.post('/', (req, res) => {
        "use strict";
        //获取到提交的内容信息

        var title = req.body.title;
        var introduction = req.body.introduction;
        var n_like = req.body.n_like;
        var pic_src = req.body.pic_src;
        var tag = req.body.tag;
        var href = req.body.href;

        if (!title || !introduction || !n_like || !pic_src || !tag || !href) {
            res.status(400).send('填写内容不能为空').end();
        } else {
            if (req.body.mod_id) {
                //修改逻辑
                db.query(`UPDATE blog_table SET title='${title}', content='${introduction}', n_like='${n_like}', pic_src='${pic_src}', tag='${tag}', href='${href}' WHERE ID='${req.body.mod_id}'`, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('database error').end();
                    } else {
                        res.redirect('/admin/blog');
                    }
                });
            } else {
                //新添加逻辑
                db.query(`INSERT INTO blog_table (title, content, n_like, pic_src, tag, href) VALUES( '${title}', '${introduction}', '${n_like}', '${pic_src}', '${tag}', href='${href}')`, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('database error').end();
                    } else {
                        res.redirect('/admin/blog');
                    }
                });
            }
        }
    });
    return router;
};

//# sourceMappingURL=blog-compiled.js.map