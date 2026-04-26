import axios from 'axios';
import cloudinary from '../config/cloudinary';
import file from '../models/file.js';
import streamifier from 'streamifier';

const getFileType = (mimetype) => {
    if(mimetype.startsWith("image/")){
        return "image";
    }
    else if(mimetype === "application/pdf"){
        return "pdf";
    }
    return "other";
}

export const uploadFile = async (req, res) => {
    try {
        const file= req.file;
        if(!file){
            return res.status(400).json({message: "No file uploaded"});
        }
        const {originalname, mimetype, size, buffer} = file;
        const fileType = getFileType(mimetype);
        const deletecode=Math.floor(1000+Math.random()*9000).toString();
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {resource_type: "auto"},
                (error, result) => {
                    if(error){
                        reject(error);
                    } else {
                        resolve(result);
                    }
                },
            );
            streamifier.createReadStream(buffer).pipe(uploadStream);
        });
        const newFile = new file({
            filename: originalname,
            fileUrl: result.secure_url,
            publicId: result.public_id,
            fileType,
            fileSize: size,
            deleteCode: deletecode,
        });
        res.status(201).json({message: "File uploaded successfully", file: newFile, deletecode});   


    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
    export const getfiles = async (req, res) => {
    try {
        const files = await file.find().sort({createdAt: -1});
        res.status(200).json(files);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    } 
}