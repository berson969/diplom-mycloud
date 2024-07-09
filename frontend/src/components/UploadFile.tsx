import React, {useRef, useState} from 'react';

import {useGetFilesQuery, useUploadFileMutation} from "../api";
import {useSelector} from "react-redux";
import {getCurrentUser, getLoginUser} from "../selectors";
import ErrorAlert from "./ErrorAlert.tsx";
import {UploadFileResponse} from "../models";
import getErrorMessage from "../hooks/getErrorMessage.ts";


const UploadFile: React.FC = () => {
    const currentUser = useSelector(getCurrentUser);
    const loginUser = useSelector(getLoginUser);
    const [ uploadFile, { isLoading}] = useUploadFileMutation()
    const [file, setFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const fileName = useRef<HTMLInputElement | null>(null);

    const folderName = currentUser?.folder_name;
    const { refetch } = useGetFilesQuery(folderName || '');
    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const selectedFile = files[0];
            setFile(selectedFile);
        }
    };

    const onUploadFile = async () => {
        if (!file || !currentUser?.folder_name || !currentUser.id) return;

        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('user', currentUser.id.toString());
        formData.append('folder_name', currentUser.folder_name);
        formData.append('file_name',  file.name);

        try {
            const response: UploadFileResponse = await uploadFile(formData);
            if (response.error && 'error' in response) {
                setErrorMessage(getErrorMessage(response.error));
            } else {
                console.log('Файл загружен успешно', response);
				setErrorMessage('');
            }
        } catch (uploadError: any)  {
            if ('status' in uploadError && 'data' in uploadError) {
                setErrorMessage(`статус ${uploadError.status} ${uploadError.data.file}`);
            } else {
                setErrorMessage(`Неизвестная ошибка`);
            }
            console.log('Ошибка при загрузке файла', uploadError);
        } finally {
            setFile(null)
            refetch()
            if (fileName.current) {
				if ("value" in fileName.current) {
					fileName.current.value = '';
				}
            }
        }
    };
    if (!loginUser || !currentUser || loginUser.id !== currentUser.id) return null;
    return (
        <div className="mt-4">
            <div className="mb-1">
                <label htmlFor="formFile" className="form-label">Загрузить новый файл</label>
                <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    onChange={onFileChange}
                    ref={fileName}
                />
            </div>
            {errorMessage && (
                <div className="container mx-auto mt-4">
                    <ErrorAlert typeError="Ошибка загрузки файлов:" message={errorMessage} visible={false}/>
                </div>
            )}
            {file && (
                <div className="d-flex justify-content-end">
                    <button
                        onClick={() => onUploadFile()}
                        className="btn btn-primary mt-1"
                    >
                        {isLoading ? 'Загрузка...' : 'Загрузить'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default UploadFile;
