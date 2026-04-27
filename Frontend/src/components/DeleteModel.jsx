import {useState} from "react";

const DeleteModel=({file,onClose,onConfirm})=>{
    const [code,setCode]=useState("");
    if(!file)return null;
    const handleSubmit=()=>{
        if(code.length !== 4){
            alert("Code must be 4 characters long");
            return; 
        }
        onConfirm(code);
        setCode("");
        onClose(); 
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-md">
            <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-slate-950/95 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.55)]">
                <p className="text-sm uppercase tracking-[0.25em] text-rose-200/80">Delete confirmation</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Enter the 4-digit code</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                    This action removes the selected file from storage and cannot be undone.
                </p>
                <input
                    type="password"
                    maxLength={4}
                    value={code}
                    onChange={(e)=>setCode(e.target.value)}
                    className="mt-5 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="****"
                />
                <div className="mt-5 flex items-center justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/5"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400"
                    >
                        Delete file
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModel;