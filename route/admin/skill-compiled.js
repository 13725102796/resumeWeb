const express = require('express');
const mysql = require('mysql');

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
                db.query(`DELETE FROM skill_table WHERE ID=${req.query.id}`, (err, data) => {
                    if (err) {
                        res.status(500).send('database error').end();
                    } else {
                        res.redirect('/admin/skill');
                    }
                });
            } else {
                //全部删除逻辑
                res.send('您暂时还没有权限删除全部数据').end();
            }
        } else {
            db.query(`SELECT * FROM skill_table`, (err, experienceData) => {
                if (err) {
                    res.status(500).send('database error').end();
                } else {
                    res.render('page/skill.ejs', { experienceData });
                }
            });
        }
    });

    router.post('/', (req, res) => {
        "use strict";
        //获取到提交的内容信息

        var title = req.body.title;
        var introduction = req.body.introduction;
        var icon = req.body.icon;
        if (!title || !introduction) {
            res.status(400).send('填写内容不能为空').end();
        } else {
            if (req.body.mod_id) {
                //修改逻辑
                db.query(`UPDATE skill_table SET title='${title}', content='${introduction}', ic_src='${icon}' WHERE ID='${req.body.mod_id}'`, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('database error').end();
                    } else {
                        res.redirect('/admin/skill');
                    }
                });
            } else {
                //新添加逻辑
                db.query(`INSERT INTO experience_table (title, content, ic_src) VALUES( '${title}', '${introduction}', '${icon}')`, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('database error').end();
                    } else {
                        res.redirect('/admin/skill');
                    }
                });
            }
        }
    });
    return router;
};

//# sourceMappingURL=skill-compiled.js.map