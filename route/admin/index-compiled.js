const express = require('express');

module.exports = function () {
    var router = express.Router();

    router.get('/', (req, res) => {

        res.render('page/index.ejs');
    });

    router.get('/home', (req, res) => {

        res.render('page/home.ejs');
    });
    router.get('/intro', (req, res) => {

        res.render('page/introduce.ejs');
    });
    router.get('/skill', (req, res) => {

        res.render('page/skill.ejs');
    });
    router.get('/experience', (req, res) => {

        res.render('page/experience.ejs');
    });
    router.get('/blog', (req, res) => {

        res.render('page/blog.ejs');
    });

    return router;
};

//# sourceMappingURL=index-compiled.js.map