import { Download, FileText, Trash2 } from "lucide-react";
import formatFileSize from "../utils/formatFileSize";
import { API_URL } from "../services/fileService";

const FileCard=({file,openModel})=>{
    const fileName = file.filename || "Untitled file";
    const fileSize = file.fileSize ? formatFileSize(file.fileSize) : "Unknown size";
    const fileDate = file.createdAt || file.createAt;

    return (
        <div className="grid gap-4 px-5 py-5 md:grid-cols-[minmax(0,1.8fr)_160px_120px] md:items-center">
            <div className="flex items-start gap-4">
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-100">
                    <FileText className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold text-white">{fileName}</h3>
                    <p className="mt-1 text-sm text-slate-400">{fileSize}</p>
                </div>
            </div>
            <div className="text-sm text-slate-300 md:text-left">
                {fileDate ? new Date(fileDate).toLocaleString() : "No date available"}
            </div>
            <div className="flex items-center justify-start gap-2 md:justify-end">
                <a
                    href={`${API_URL}/download/${file._id}`}
                    className="inline-flex items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 p-3 text-emerald-100 transition hover:border-emerald-300/40 hover:bg-emerald-400/20"
                    title="Download file"
                >
                    <Download className="h-4 w-4" />
                </a>
                <button
                    onClick={()=>openModel(file._id)}
                    className="inline-flex items-center justify-center rounded-full border border-rose-400/20 bg-rose-400/10 p-3 text-rose-100 transition hover:border-rose-300/40 hover:bg-rose-400/20"
                    title="Delete file"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        </div>
        );

};
export default FileCard;