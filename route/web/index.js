const express = require('express');
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'nodejs',
    password: 'nodejs',
    database:'resume',
    port: 3306
});
module.exports = function () {
    const router = express.Router();

    router.use('/about', (req, res)=> {
        db.query(`SELECT * FROM about_table`, (err, data)=> {
            "use strict";
            if (err) {
                res.status(500).send('databases error').end();
            } else {
                res.send(data).end();
            }
        })
    });
    router.use('/experience', (req, res)=> {
        db.query(`SELECT * FROM experience_table`, (err, data)=> {
            "use strict";
            if (err) {
                console.log(err)
                res.status(500).send('databases error').end();
            } else {
                res.send(data).end();
            }
        })
    });
    router.use('/blog', (req, res)=> {
        db.query(`SELECT * FROM blog_table`, (err, data)=> {
            "use strict";
            if (err) {
                res.status(500).send('databases error').end();
            } else {
                res.send(data).end();
            }
        })
    });
    router.use('/skill', (req, res)=> {
        db.query(`SELECT * FROM skill_table`, (err, data)=> {
            "use strict";
            if (err) {
                res.status(500).send('databases error').end();
            } else {
                res.send(data).end();
            }
        })
    });

    return router;

}
