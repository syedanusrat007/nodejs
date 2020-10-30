const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log("connected"))
    .catch(err => console.log('connection failed', err));

const coureseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255,
        // match : /pattern/
    },
    author: { type: String, required: true },
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {

                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);

            },
            message: 'one tag is must'

        }
    },
    date: { type: Date, default: Date.now },
    isPublished: { type: Boolean },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        // lowercase: true,
        uppercase: true,
        trim: true
    },
    price: {
        type: Number,
        required: function () { return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', coureseSchema);

async function createCourse() {
    const course = new Course({
        name: "App 3",
        author: "tonni",
        tags: null,
        isPublished: true,
        category: '-',
        price: 25
    });

    try {
        const result = await course.save();
        console.log(result);
    } catch (err) {

        for (field in err.errors) {
            console.log(err.errors[field].message);
        }
    }
}

async function getCourse() {
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        .find({ author: "tonni" })
        // .find({ author: /^tonni/ }) //starts
        // .find({ author: /tonni$/i }) //ends
        // .find({ author: /.*tonni.*/i }) //containes
        //logical op
        // .find()
        // .or([{ author: "tonni" }, { isPublished: true }])
        // .and([{}, {}])
        //comparison op
        // .find({ price: { $gte: 10, $lte: 20 } })
        // .find({ price: { $in: [10, 15, 20] } })
        // .skip((pageNumber - 1) * pageSize)
        // .limit(pageSize)
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    // .count();
    console.log(courses);
}

async function updateCourse(id) {

    //query first
    // const course = await Course.findById(id);
    // if (!course) return;
    // course.isPublished = true;
    // course.author = 'nusraht';
    // const result = await course.save();
    // console.log(result);

    //update direct
    // const result = await Course.update({ _id: id }, {
    //     $set: {
    //         author: 'tonni',
    //         isPublished: false
    //     }
    // });
    // console.log(result);

    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'nusraht',
            isPublished: true
        }
    }, { new: true });
    console.log(course);

}

async function removeCourse(id) {

    // const course = await Course.deleteOne({ _id: id });
    // console.log(course);

    const course = await Course.findByIdAndRemove(id);
    console.log(course);


}

createCourse();
// getCourse();
// updateCourse('5f785b7b44018025fc4aa81c');
// removeCourse('5f785b7b44018025fc4aa81c');
