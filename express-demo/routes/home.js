const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    //res.send('hello world!');
    res.render('index', { title: 'App', msg: 'sdh' })
});

module.exports = route;