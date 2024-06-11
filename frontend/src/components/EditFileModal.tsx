import React, {useEffect, useState} from 'react';
import {FileEditModalProps} from "../models";
import Modal from "bootstrap/js/dist/modal";
import {useUpdateFileMutation} from "../api";

const EditFileModal: React.FC<FileEditModalProps> = ({ file}) => {
    const [fileName, setFileName] = useState(file.file_name);
    const [comment, setComment] = useState(file.comment);
    const [ updateFile ] = useUpdateFileMutation();

    useEffect(() => {
        const modalElement = document.getElementById('fileEditModal');
        if (modalElement) {
            const modal = new Modal(modalElement);
            modal.show();
        }
    }, []);

    const handleSave = async () => {
        console.log("edit again")
        const data = {

        }
        const response = await updateFile(data)
        console.log("update ok", response)

    };


    return (
        <div className="modal fade" id="fileEditModal" tabIndex={-1} aria-labelledby="fileEditModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="fileEditModalLabel">Редактировать файл</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="fileName" className="form-label">Имя файла</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fileName"
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="comment" className="form-label">Комментарий</label>
                            <input
                                type="text"
                                className="form-control"
                                id="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSave}>Сохранить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditFileModal;
