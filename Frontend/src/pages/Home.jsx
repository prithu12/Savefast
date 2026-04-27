import { useState } from "react";
import { FileArchive, ShieldCheck, Sparkles } from "lucide-react";
import UploadBox from "../components/UploadBox";
import FileCard from "../components/FileCard";
import DeleteModel from "../components/DeleteModel";
import useFile from "../hooks/useFile";

const Home=()=>{
    const {files,loading,error,success,upload,deleteFile}=useFile();
    const [isOpen,setIsOpen]=useState(false);
    const [selectedFile,setSelectedFile]=useState(null);
    const openModel=(id)=>{
        setSelectedFile(id);
        setIsOpen(true);
    };
    const handleDeleteConfirm=(code)=>{
        deleteFile(selectedFile,code);
        setIsOpen(false);
        setSelectedFile(null);
    }
    return (
        <div className="min-h-screen px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-7xl flex-col gap-6 rounded-[32px] border border-white/10 bg-white/8 p-4 shadow-[0_24px_90px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:p-6 lg:p-8">
                <header className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(17,24,39,0.8))] p-6 shadow-2xl shadow-cyan-950/30 sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl space-y-4">
                            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
                                <Sparkles className="h-4 w-4" />
                                Savefast file hub
                            </span>
                            <div>
                                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                                    A polished workspace for uploads, downloads, and quick cleanup.
                                </h1>
                                <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                                    Drop files into the upload card, track the newest items below, and keep the library tidy with a fast delete flow.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm sm:min-w-[280px]">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-slate-400">Stored files</p>
                                <p className="mt-2 text-2xl font-semibold text-white">{files.length}</p>
                            </div>
                            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                                <p className="text-emerald-100/80">Protected actions</p>
                                <p className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-emerald-50">
                                    <ShieldCheck className="h-5 w-5" />
                                    Code verified
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
                    <section className="rounded-[28px] border border-white/10 bg-slate-950/55 p-5 shadow-xl shadow-slate-950/25 backdrop-blur-sm sm:p-6">
                        <UploadBox onUpload={upload} />
                        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                            <p className="font-medium text-white">Upload tips</p>
                            <ul className="mt-3 space-y-2">
                                <li>Use the 4-digit delete code if you want to remove a file later.</li>
                                <li>PNG and PDF documents are handled cleanly in the current flow.</li>
                                <li>New uploads appear at the top of the recent list.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="rounded-[28px] border border-white/10 bg-slate-950/55 p-5 shadow-xl shadow-slate-950/25 backdrop-blur-sm sm:p-6">
                        <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.25em] text-cyan-200/80">Recent files</p>
                                <h2 className="mt-2 text-2xl font-semibold text-white">Overview of stored documents</h2>
                            </div>
                            <p className="max-w-md text-sm text-slate-400">
                                Download what you need, inspect the metadata, or remove an outdated item in a few clicks.
                            </p>
                        </div>

                        {loading && (
                            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-cyan-100">
                                <span className="loader h-5 w-5 rounded-full" />
                                <span>Processing your request...</span>
                            </div>
                        )}

                        {success && (
                            <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-emerald-50">
                                {success}
                            </div>
                        )}

                        {error && (
                            <div className="mt-5 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-rose-50">
                                {error}
                            </div>
                        )}

                        <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                            <div className="hidden grid-cols-[minmax(0,1.8fr)_160px_120px] gap-4 border-b border-white/10 px-5 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400 md:grid">
                                <span>File name</span>
                                <span>Date</span>
                                <span className="text-right">Actions</span>
                            </div>

                            <div className="divide-y divide-white/10">
                                {files.length===0 ? (
                                    <div className="p-8 text-center text-slate-400">
                                        <FileArchive className="mx-auto mb-3 h-10 w-10 text-cyan-200/80" />
                                        <p className="text-lg font-medium text-slate-200">No files uploaded yet</p>
                                        <p className="mt-2 text-sm">Your recent uploads will appear here as soon as you add them.</p>
                                    </div>
                                ) : (
                                    files.map((file)=>(
                                        <FileCard key={file._id || file.id} file={file} openModel={openModel}/>
                                    ))
                                )}
                            </div>
                        </div>
                    </section>
                </main>

                {isOpen && (
                    <DeleteModel file={selectedFile} onClose={()=>setIsOpen(false)} onConfirm={handleDeleteConfirm}/>
                )}
            </div>
        </div>
    );
}
export default Home;