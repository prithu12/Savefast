import axios from 'axios';
export const API_URL = 'http://localhost:5000/api/files';

export const uploadFile = async (formData) => {
    const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};
export const getFiles=async()=>{
    const res=await axios.get(API_URL);
    return res.data;
};

export const deleteFile=async(id,code)=>{
    const res = await axios.delete(`${API_URL}/${id}`, {
        data: { code },
    });
    return res.data;
};