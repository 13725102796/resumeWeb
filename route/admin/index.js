const express = require('express');

module.exports = function () {
    var router = express.Router();

    router.use((req, res, next)=>{
        if(!req.session['admin_id'] && req.url!='/login'){
            res.redirect('/admin/login');
        }else{
            next();
        }
    });


    router.use('/login', require('./login.js')());
    router.use('/intro', require('./introduce.js')());
    router.use('/experience', require('./experience.js')());
    router.use('/skill', require('./skill.js')());
    router.use('/blog', require('./blog.js')());
    router.get('/', (req, res)=>{

        res.render('page/index.ejs');
    });




    router.get('/home', (req, res)=>{

        res.render('page/home.ejs');
    });
    return router;

}