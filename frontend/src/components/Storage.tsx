import React from 'react';
import Loader from "./Loader.tsx";
import {getCurrentUser, getView} from "../selectors";
import ErrorAlert from "./ErrorAlert.tsx";
import {useDispatch, useSelector} from "react-redux";
import {FileType} from "../models";
import {AppDispatch} from "../store";
import {setView} from "../slices/currentUserSlice";
import UploadFile from "./UploadFile.tsx";
import NotFoundFiles from "./NotFoundFiles.tsx";
import FileContextMenu from "./FileContextMenu.tsx";
import {useGetUsersFilesQuery} from "../api";

const Storage: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const currentUser = useSelector(getCurrentUser);
	if (!currentUser) return <Loader />;
	const { data: files, isLoading, error }
		= useGetUsersFilesQuery(currentUser?.user_folder ?? '',
				{
					skip: !currentUser,
				});
	const view = useSelector(getView);

	const handleView = (tag: string) => {
		sessionStorage.setItem('view', tag);
		dispatch(setView(tag));
	}
	// @ts-ignore
	const errorMessage: string = error && error.data ? error.data : '';
	console.log("storage files", files)

	return (
		<div className="container mt-4">
			<div className="d-flex justify-content-between mb-3">
				<h2>{`Хранилище файлов пользователя ${currentUser ? currentUser.username : 'текущего'}`} </h2>
				<div className="btn-group" role="group" aria-label="Basic outlined example">
					<button
						className={`btn ${ view === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
						onClick={() => handleView('list')}
					>
						{/*Список*/}
						<i className="bi bi-list-ul"></i>
					</button>
					<button
						className={`btn ${ view === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
						onClick={() => handleView('grid')}
					>
						{/*Сетка*/}
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

