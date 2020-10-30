const debug = require('debug')('app:startup');
const config = require('config');
const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const auth = require('./middleware/auth');
const courses = require('./routes/courses')
const home = require('./routes/home')
const Joi = require('joi');
const express = require('express');
const { urlencoded } = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);
app.use(auth);
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);


console.log(config.get('name'));
console.log(config.get('mail.host'));
console.log(config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug("Morgan enabled!");
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening ${port}`);
});