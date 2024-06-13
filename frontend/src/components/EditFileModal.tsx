import React, {useEffect, useState} from 'react';
import Modal from "bootstrap/js/dist/modal";
import {useDispatch, useSelector} from "react-redux";

import {getCurrentUser, getEditFile, selectActiveState} from "../selectors";
import ErrorAlert from "./ErrorAlert.tsx";
import {useUpdateFileMutation} from "../api";
import {setActiveState} from "../slices/currentUserSlice.ts";
import {AppDispatch} from "../store";

const EditFileModal: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const updateFile = useSelector(getEditFile);
    const currentUser =useSelector(getCurrentUser);
    const activeState = useSelector(selectActiveState);
    const [ updatingFile, { isLoading, error}] = useUpdateFileMutation();
    const [fileName, setFileName] = useState('');
    const [comment, setComment] = useState('');

    if (!updateFile) {
        return (
        <ErrorAlert typeError="Ошибка : " message="Выберите файл" visible={true} />
        )
    } else if (!currentUser || currentUser !== updateFile.user) {
        return (
            <ErrorAlert typeError="Ошибка : " message="Редактирование этого файла запрещено" visible={true} />
        )
    }

    useEffect(() => {
        const modalElement = document.getElementById('fileEditModal');
        if (modalElement) {
            const modal = new Modal(modalElement);
            if (activeState === 'edit') {
                modal.show();
            } else {
                modal.hide()
                dispatch(setActiveState('auth'));
            }
        }
    }, [activeState]);

    const handleSave = async () => {
        const data = {
            user_folder: currentUser.user_folder,
            id: updateFile.id,
            file_name: fileName,
            comment: comment,
        }
        console.log("data update", data)
        const response = await updatingFile(data)
        console.log("update ok", response)
        console.log("data update 2", data)
    }

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
    )
}

export default EditFileModal;
