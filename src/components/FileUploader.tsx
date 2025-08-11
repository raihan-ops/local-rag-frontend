import { useRef } from 'react';
import { uploadFile } from '../services/api';

export default function FileUploader() {
    const fileRef = useRef<HTMLInputElement>(null);

    async function onUpload() {
        const file = fileRef.current?.files?.[0];
        if (!file) return alert('Choose a file');
        const res = await uploadFile(file);
        if (res.success) alert('File indexed');
        else alert('Upload failed');
    }

    return (
        <div className="p-2">
            <input ref={fileRef} type="file" />
            <button className="ml-2 px-3 py-1 bg-slate-700 text-white rounded" onClick={onUpload}>
                Upload
            </button>
        </div>
    );
}
