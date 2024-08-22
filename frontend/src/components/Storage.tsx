import React, {useEffect, useState} from 'react';
import Loader from "./Loader.tsx";
import {getCurrentUser, getLoginUser, getView} from "../selectors";
import ErrorAlert from "./ErrorAlert.tsx";
import {useDispatch, useSelector} from "react-redux";
import {FileType} from "../models";
import {AppDispatch} from "../store";
import {setCurrentUser, setView} from "../slices/usersSlice";
import UploadFile from "./UploadFile.tsx";
import NotFoundFiles from "./NotFoundFiles.tsx";
import FileContextMenu from "./FileContextMenu.tsx";
import {useGetFilesQuery} from "../api";
import AdminPanel from "./AdminPanel.tsx";
import getErrorMessage from "../hooks/getErrorMessage.ts";

const Storage: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const currentUser = useSelector(getCurrentUser);
	const loginUser = useSelector(getLoginUser);
	const view = useSelector(getView);
	const [ errorMessage, setErrorMessage ] = useState('')

	useEffect(() => {
		if (!currentUser) {
			if (loginUser) {
				dispatch(setCurrentUser(loginUser));
			}
		} else if (!currentUser.folder_name ) {
			setErrorMessage('Нет папки пользователя');
		}
	}, [currentUser, loginUser, dispatch]);

	const { data: files, isLoading, error }
		= useGetFilesQuery(currentUser?.folder_name ?? '', {skip: !currentUser?.folder_name});

	console.log('currentUser', currentUser);
	// console.log('Files data:', files);
	// console.log('Error:', error);

	useEffect(() => {
		if (error) {
			setErrorMessage(getErrorMessage(error));
		}
	}, [error]);

	const handleView = (tag: string) => {
		sessionStorage.setItem('view', tag);
		dispatch(setView(tag));
	}

	if (!currentUser || !currentUser?.folder_name) return <Loader />;

	console.log("storage files", files)

	return (
		<div className="container mt-4">
			<AdminPanel />
			<div className="d-flex justify-content-between mb-3">
				<h2>{`Хранилище файлов пользователя ${currentUser ? currentUser.username : 'текущего'}`} </h2>
				<div className="btn-group" role="group" aria-label="Basic outlined example">
					<button
						className={`btn ${ view === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
						onClick={() => handleView('list')}
					>
						{/*List*/}
						<i className="bi bi-list-ul"></i>
					</button>
					<button
						className={`btn ${ view === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
						onClick={() => handleView('grid')}
					>
						{/*Grid*/}
						<i className="bi bi-grid-3x3-gap"></i>
					</button>

				</div>
			</div>
			{errorMessage &&
				<div className="container mx-auto mt-4">
					<ErrorAlert typeError="Ошибка загрузки файлов:" message={errorMessage} visible={false}/>
				</div>
			}
			<div className={view === 'list' ? 'list-group' : 'row'}>
				{isLoading && <Loader />}
				{files && !files.length && <NotFoundFiles />}
				{files && files.map((file: FileType) => (
					<FileContextMenu  key={file.id} file={file} />
				))}
			</div>
			<UploadFile />
		</div>
	);
};

export default Storage;

