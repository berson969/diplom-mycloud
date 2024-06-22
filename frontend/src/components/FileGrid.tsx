import React from 'react';

import {FileType} from "../models";
import FileIcon from "./FileIcon";
import {formattedFileSize} from "../hooks/formattedFileSize";


const FileGrid: React.FC<{file: FileType, onDownload: ()=> void}> = ({file, onDownload}) => {
    return (
        <div className="card mb-4">
            <a
				href={`api/download/${file.unique_id}`}
				onClick={onDownload}
				download={file.file_name}
			>
                <FileIcon fileName={file.file_name} />
                <div className="card-body">
                    <h6 className="card-title ">{`${file.file_name} - ${formattedFileSize(file.size)}`}</h6>
                </div>
            </a>
        </div>
    );
};

export default FileGrid;
