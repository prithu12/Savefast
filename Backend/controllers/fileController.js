import axios from 'axios';
import cloudinary from '../config/cloudinary.js';
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
        const uploadedFile = req.file;
        if(!uploadedFile){
            return res.status(400).json({message: "No file uploaded"});
        }
        const {originalname, mimetype, size, buffer} = uploadedFile;
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
        await newFile.save();
        res.status(201).json({message: "File uploaded successfully", file: newFile, deletecode});   


    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
};
export const getfiles = async (req, res) => {
    try {
        const files = await file.find().sort({createdAt: -1});
        res.status(200).json(files);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    } 
};
export const downloadFile = async (req, res) => {
    try {
        const {id} = req.params;
        const fileData = await file.findById(id);   
        if(!fileData){
            return res.status(404).json({message: "File not found"});
        }
        const response = await axios.get(fileData.fileUrl, {responseType: "stream"});
        res.setHeader("Content-Disposition", `attachment; filename="${fileData.filename}"`);
        res.setHeader("Content-Type", "application/octet-stream");
        response.data.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }   
};
export const deleteFile = async (req, res) => {
    try {
        const {id} = req.params;
        const {code}= req.body;
        const fileData = await file.findById(id);
        if(!fileData){
            return res.status(404).json({message: "File not found"});
        }
        if(fileData.deleteCode !== code){
            return res.status(403).json({message: "Invalid delete code"});
        }
        await cloudinary.uploader.destroy(fileData.publicId, {resource_type: "auto"});
        await file.findByIdAndDelete(id);
        res.status(200).json({message: "File deleted successfully"});

    }catch (error) {
    console.error(error);
    res.status(500).json({message: "Server error"});
    }
};