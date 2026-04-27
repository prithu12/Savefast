import { useState, useEffect } from "react";
import { getFiles,uploadFile,deleteFile } from "../services/fileService";


const useFile=()=>{
    const [files,setFiles]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [success,setSuccess]=useState("");
    const fetchFiles=async()=>{
        try{
            setLoading(true);
            setError(null);
            const data=await getFiles();
            setFiles(data);
        }
        catch(err){
            setError(err.response?.data?.message || "Failed to fetch files");
        }finally{
            setLoading(false);
        }
    };
    const handledUpload=async(formData)=>{
        try{
            setLoading(true);
            setError(null);
            setSuccess("");
            const data=await uploadFile(formData);
            setFiles((prev)=>[data.file,...prev]);
            setSuccess(data.message);
        }catch(err){
            setError(err.response?.data?.message || "Failed to upload file");
        }finally{
            setLoading(false);
        }
    };
    const handleDelete=async(id,code)=>{
        try{
            setLoading(true);
            setError(null);
            setSuccess("");
            const data=await deleteFile(id,code);
            setFiles((prev)=>prev.filter((f)=>f.id!==id));
            setSuccess(data.message);
        }catch(err){
            setError(err.response?.data?.message || "Failed to delete file");
        }finally{
            setLoading(false);
        }   
    };
    useEffect(()=>{
        if(success || error){
            const timer=setTimeout(()=>{
                setSuccess("");
                setError(null);
            },4000);
            return ()=>clearTimeout(timer);
        }
    },[success,error]);
    useEffect(()=>{
        const timer=setTimeout(()=>{
            fetchFiles();
        },0);
        return ()=>clearTimeout(timer);
    },[]);
    return {files,loading,error,success,upload:handledUpload,deleteFile:handleDelete,refetch:fetchFiles};
};

export default useFile;