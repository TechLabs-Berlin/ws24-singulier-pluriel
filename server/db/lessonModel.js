const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cloudinary = require('cloudinary');

const lessonSchema = new Schema ({
    title: String,
    // description: String,
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    materials: [
        {
            url: String,
            filename: String,
            type: {
                type: String,
                enum: ['file', 'link']
            }
	    }
    ]
    // assignments:
});


lessonSchema.post('findOneAndDelete', async function (doc) {
    try {
        let materials = doc.materials;
        if(materials){
            for(mat of materials){
                if(mat.filename){
                    let fileId = mat.filename;
                    fileId = fileId.replace('/singulier-pluriel', '');
                    cloudinary.v2.uploader.destroy(fileId);
                };
            };
        };
    } catch (err) {
        console.log(err)
    }
});


lessonSchema.methods.toJSON = function () {
    const lesson = this;
    const lessonObject = lesson.toObject();

    delete lessonObject.__v;

    return lessonObject;
};

module.exports = mongoose.model('Lesson', lessonSchema);