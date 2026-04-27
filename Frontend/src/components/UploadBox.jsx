import { FolderUp, Upload } from "lucide-react";

const UploadBox=({onUpload})=>{
    const handleFileChange=(e)=>{
        const file=e.target.files[0];
        if(!file){
            return;
        }
        const formData=new FormData();
        formData.append("file",file);
        onUpload(formData);
    };
    return (
        <div className="space-y-5">
            <div>
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-200/80">Upload center</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Add a file</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">Keep the file library current by dropping a new document into the workspace.</p>
            </div>

            <label className="group flex cursor-pointer flex-col items-center justify-center gap-4 rounded-[24px] border border-dashed border-cyan-400/25 bg-cyan-400/5 px-5 py-10 text-center transition hover:border-cyan-300/55 hover:bg-cyan-400/10">
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 p-4 text-cyan-100 transition group-hover:scale-105">
                    <FolderUp className="h-8 w-8" />
                </span>
                <span className="space-y-2">
                    <span className="block text-lg font-semibold text-white">Select a file to upload</span>
                    <span className="block text-sm text-slate-400">Maximum file size: 10MB. Supported formats: PNG, PDF, JPG.</span>
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition group-hover:bg-cyan-100">
                    <Upload className="h-4 w-4" />
                    Browse files
                </span>
                <input type="file" onChange={handleFileChange} hidden />
            </label>
        </div>
    );
}
export default UploadBox;