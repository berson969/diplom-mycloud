import React, {useEffect, useState} from 'react';

import {useGetUsersFilesQuery, useUploadFileMutation} from "../api";
import {useSelector} from "react-redux";
import {getCurrentUser} from "../selectors";
import ErrorAlert from "./ErrorAlert.tsx";


const UploadFile: React.FC = () => {
    const currentUser = useSelector(getCurrentUser);
    const [ uploadFile, { isLoading, error}] = useUploadFileMutation()
    const { refetch } = useGetUsersFilesQuery(currentUser);
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const selectedFile = files[0];
            setFile(selectedFile);
            setFileName(e.target.value)
        }
    };

    useEffect(() => {
        if (!uploading) {
            setUploadProgress(0);
            setFile(null);
            setFileName(null);
            refetch();
        }
    }, [uploading]);

    useEffect(() => {
        if (file) {
            setUploading(true);
        }
    }, [file]);

    const onUploadFile = async () => {
        if (!file || !fileName) return;
        if (!currentUser || !currentUser.user_folder || !currentUser.id) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('user', currentUser.id);
        formData.append('user_folder', currentUser.user_folder);
        formData.append('file_name', fileName);

        try {
            const response = await uploadFile(formData);
            console.log('response upload',response, isLoading, error)
            if (response.status === 201) {
                console.log('Файл загружен успешно');
            } else {
                const errorMessage = `${response.error.status} - ${response.error.data.toString()}`
                console.log('status', response.error.status)
                return (
                    <div className="container mx-auto mt-4">
                        <ErrorAlert typeError="Ошибка загрузки файлов:" message={errorMessage} />
                    </div>
                )}
            console.log('Файл загружен успешно');
        } catch (error) {
            console.log('Error uploading file', error);
        } finally {
            setUploading(false);
        }
    };



    return (
        <div className="mt-4">
            <div className="mb-1">
                <label htmlFor="formFile" className="form-label">Загрузить новый файл</label>
                <input
                    className="form-control"
                    type="file"

                    id="formFile"
                    onChange={onFileChange}
                />
            </div>
            {errorMessage && (
                <div className="container mx-auto mt-4">
                    <ErrorAlert typeError="Ошибка загрузки файлов:" message={errorMessage} />
                </div>
            )}
            {uploading && (
                <div className="d-flex justify-content-end">
                    <button
                        onClick={() => onUploadFile()}
                        className="btn btn-primary mt-1"
                    >
                        {uploadProgress ? 'Загрузка...' : 'Загрузить' }
                    </button>
                </div>
            )}
        </div>
    );
};

export default UploadFile;
