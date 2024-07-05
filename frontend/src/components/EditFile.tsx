import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getCurrentUser, getEditFile} from "../selectors";
import ErrorAlert from "./ErrorAlert.tsx";
import {useGetFilesQuery, useUpdateFileMutation} from "../api";
import {setActiveState} from "../slices/usersSlice";
import {AppDispatch} from "../store";
import {FileType} from "../models";
import getErrorMessage from "../hooks/getErrorMessage.ts";

const EditFile: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const updateFile: FileType | null = useSelector(getEditFile);
    const currentUser =useSelector(getCurrentUser);
    const [ updatingFile] = useUpdateFileMutation();

    if (!updateFile) return <ErrorAlert typeError="Ошибка : " message="Выберите файл" visible={true} />;
    const [fileName, setFileName] = useState(updateFile.file_name);
    const [comment, setComment] = useState(updateFile.comment);
    const [errorMessage, setErrorMessage ] = useState('')

    const folderName = currentUser?.folder_name;
    const { refetch } = useGetFilesQuery(folderName || '');

    if (!currentUser || currentUser.id !== updateFile.user) return <ErrorAlert typeError="Ошибка : " message="Редактирование этого файла запрещено" visible={true} />;

    const handleSave = async () => {
        const data = {
            folder_name: currentUser.folder_name,
            id: updateFile.id,
            file_name: fileName,
            comment: comment,
        }
        try {
            const response = await updatingFile(data).unwrap()
            console.log("response", response, response.status)
            dispatch(setActiveState('auth'));

        } catch (error) {
            console.error('Ошибка при обновлении файла2:', error);
            if (error) setErrorMessage(getErrorMessage(error));
        } finally {
            refetch();
        }
    }

    const handleCancel = () => {
        dispatch(setActiveState('auth'));
        refetch();
    }

    if (errorMessage) return <ErrorAlert typeError="Ошибка при обновлении файла:" message={errorMessage} visible={true} />;
    return (
        <div>
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
            <div className="modal-footer gap-2">
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Отмена</button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>Сохранить</button>
            </div>
        </div>
    )
}

export default EditFile;
