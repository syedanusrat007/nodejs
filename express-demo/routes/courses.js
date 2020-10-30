const express = require('express');
const route = express.Router();

const courses = [
    { id: 1, name: 'C1' },
    { id: 2, name: 'C2' },
    { id: 3, name: 'C3' },
]

route.get('/', (req, res) => {
    res.send(courses);
})

route.get('/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Not Found');
    res.send(course);
})

route.post('/', (req, res) => {

    const { error } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


route.put('/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Not Found');

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});


route.delete('/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Not Found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(2).required()
    }
    return Joi.validate(course, schema);
}

module.exports = route;