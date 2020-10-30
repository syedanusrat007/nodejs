const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() => { console.log('connected') })
    .catch((err) => { console.log('failed to connect', err) });

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));

async function createAuthor(name, bio, website) {
    const author = await new Author({
        name,
        bio,
        website
    });

    const result = await author.save();
    console.log(result);
}

async function createCourse(name, author) {
    const course = await new Course({
        name,
        author,
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {

    const courses = await Course.find()
        .populate('author', 'name - _id')
        .select('name author');

    console.log(courses);

}



// createAuthor('tonni', 'My bio', 'My Website');

// createCourse('Node Course', '5b8ae88f67041a904c35f8c7');

//listCourses();


