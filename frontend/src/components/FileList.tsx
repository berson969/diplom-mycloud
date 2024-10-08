import React from 'react';
import {FileType} from "../models";
import {formattedFileSize} from "../hooks/formattedFileSize.ts";

const dateFormatOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
};

const FileList : React.FC<{file: FileType, onDownload: ()=> void}> = ({file, onDownload}) => {
    return (
        <>
            <a
                href={`api/download/${file.unique_id}`}
                download={file.file_name}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                onClick={onDownload}
            >
                <div className="col-8 text-break px-1">
                    <span>{file.file_name}</span>
                </div>
                <div className="col-4 d-flex justify-content-between">
                    <span className="fst-italic fs-6 px-1">{formattedFileSize(file.size)}</span>
                    <span>{new Date(file.upload_date).toLocaleDateString('ru-RU', dateFormatOptions)}</span>
                    <span className="fst-italic fs-6 px-1 text-break">
                        {file.last_download_date
                            ? new Date(file.last_download_date).toLocaleDateString('ru-RU', dateFormatOptions)
                            : 'нет скачиваний'}
                    </span>
                </div>
            </a>
            {file.comment && (
                <p className="text-muted mt-2">{file.comment}</p>
            )}
        </>
    );
};

export default FileList;
