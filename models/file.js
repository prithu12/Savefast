import mongoose from "mongoose";
 

const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
        trim:true,
    },
    fileUrl:{
        type: String,
        required: true,

    },
    publicId:{
        type: String,
        required: true,
    },
    fileType:{
        type: String,
        required: true,
        enum:["image","pdf","doc","audio", "other"]
    },
    fileSize:{
        type: String,
        required: true,
    },
    deleteCode:{
        type: String,
        required: true,
    },
},
{
    timestamps: true,
});

const file=mongoose.model("file", fileSchema);
export default file;