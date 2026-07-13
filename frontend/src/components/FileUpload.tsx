import { useCallback } from 'react';
import { useDropzone, type FileRejection } from 'react-dropzone';

interface FileUploadProps {
    className?: string
    acceptedFiles?: {}
    multipleFiles?: boolean
    onFileAccepted: (file: File) => void;
    onFileRejected?: (message: string) => void;
}

const FileUpload = ({ className="border-2 border-dotted border-warm-450 rounded-lg hover:cursor-pointer bg-warm-100 shadow-xl p-5 w-full text-center",
                        acceptedFiles, multipleFiles=false, 
                        onFileAccepted, onFileRejected }: FileUploadProps) => {
    const onDrop = useCallback((acceptedFiles: File[], rejections: FileRejection[]) => {
        if (rejections.length > 0) {
            onFileRejected?.(
                rejections[0]?.errors[0]?.message? 
                rejections[0].errors[0].message : 
                "File type is not supported!"
            );
            return;
        }
        onFileAccepted(acceptedFiles[0]);

    }, [onFileAccepted, onFileRejected]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
            accept: acceptedFiles,
            multiple: multipleFiles
        });

    return (
        <div {...getRootProps()} className={className}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>Drop files here...</p> :
                <p>Drag and drop files here or click to select files.</p>
            }
        </div>
    )
};

export default FileUpload;