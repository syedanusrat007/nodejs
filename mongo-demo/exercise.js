//mongoimport --db mongo-exercises --collection courses --drop --file exercise-data.json --jsonArray


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/exe')
    .then(() => { console.log('connected') })
    .catch((err) => { console.log('failed to connect', err) });


const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
}));

async function getCourses() {
    return await Course.find({ isPublished: true })
        .or({ price: { $gte: 15 } }, { name: /by/i })
        .sort('-price')
        .select(['name', 'author', 'price']);
}

async function run() {
    console.log(getCourses());
}

run();
