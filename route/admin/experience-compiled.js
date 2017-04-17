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
                db.query(`DELETE FROM experience_table WHERE ID=${req.query.id}`, (err, data) => {
                    if (err) {
                        res.status(500).send('database error').end();
                    } else {
                        res.redirect('/admin/experience');
                    }
                });
            } else {
                //全部删除逻辑
                res.send('您暂时还没有权限删除全部数据').end();
            }
        } else {
            db.query(`SELECT * FROM experience_table`, (err, experienceData) => {
                if (err) {
                    res.status(500).send('database error').end();
                } else {
                    res.render('page/experience.ejs', { experienceData });
                }
            });
        }
    });

    router.post('/', (req, res) => {
        "use strict";
        //获取到提交的内容信息

        var workTime = req.body.time;
        var title = req.body.title;
        var introduction = req.body.introduction;
        var icon = req.body.icon;
        if (!title || !introduction) {
            res.status(400).send('填写内容不能为空').end();
        } else {
            if (req.body.mod_id) {
                //修改逻辑
                db.query(`UPDATE experience_table SET worktime='${workTime}', title='${title}', content='${introduction}', icon_color='${icon}' WHERE ID='${req.body.mod_id}'`, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('database error').end();
                    } else {
                        res.redirect('/admin/experience');
                    }
                });
            } else {
                //新添加逻辑
                db.query(`INSERT INTO experience_table (worktime, title, content, icon_color) VALUES( '${workTime}','${title}', '${introduction}', '${icon}')`, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('database error').end();
                    } else {
                        res.redirect('/admin/experience');
                    }
                });
            }
        }
    });
    return router;
};

//# sourceMappingURL=experience-compiled.js.map