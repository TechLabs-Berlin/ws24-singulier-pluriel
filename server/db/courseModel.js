const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Lesson = require('./lessonModel.js');
const User = require('./userModel.js');
const cloudinary = require('cloudinary');

const courseSchema = new Schema ({
    title: String,
    image: {
        url: String,
        filename: String
    },
    description: String,
    csid: String,
    lessons: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Lesson'
        }
    ],
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    startDate: Date,
    endDate: Date,
    examDate: Date,
    status: {
        type: String,
        enum: ['In Preparation', 'Active', 'Inactive'],
        default: 'In Preparation',
    }, 
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    stats: [
	    {
		    student: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
		    score: Number,
		    attendance: Number,
		    feedback: { 
                learning: Number,
                organization: Number,
                quality: Number
            }
	    }
    ]
});

courseSchema.post('findOneAndDelete', async function (doc) {
    try {
        if(doc){
            if(doc.image.filename){
                const imgId = doc.image.filename;
                imgId.replace('/singulier-pluriel', '');
                cloudinary.v2.uploader.destroy(imgId);
            }

            const lessons = await Lesson.find({ courseId: doc._id});
            for(let i = 0; i < lessons.length; i++){
                const materials = lessons[i].materials;
                for(let j = 0; j < materials.length; j++){
                    if(materials[j].filename){
                        const matId = materials[j].filename;
                        matId.replace('/singulier-pluriel', '');
                        cloudinary.v2.uploader.destroy(matId);
                    };
                };
            };
            await Lesson.deleteMany({
                _id: {
                    $in: doc.lessons
                }
            });
            await User.updateMany({}, {
                $pull: { courses: doc._id }
            });
        };
    } catch (err) {
        console.log(err)
    }
});


courseSchema.methods.toJSON = function () {
    const user = this;
    const courseObject = user.toObject();

    delete courseObject.__v;

    return courseObject;
};

module.exports = mongoose.model('Course', courseSchema);