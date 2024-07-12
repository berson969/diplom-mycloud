import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

export interface ErrorAlertProps {
	typeError: string;
	message: string;
	visible: boolean;
}

export interface UserType {
	username: string;
	password: string;
	is_staff: boolean;
	email: string;
	id: number;
	folder_name?: string;
	is_authenticated: boolean;
}

export interface UserProps {
	loginUser: UserType | null;
	currentUser: UserType | null;
	activeState: 'logout' | 'login' | 'auth' | 'sign-up' | 'edit' | 'update';
	view: 'list' | 'grid';
	isLoading: boolean;
	error: string;
}

export interface FileType {
	id: number;
	comment: string;
	file: string;
	file_name: string;
	last_download_date: string;
	path: string;
	size: number;
	unique_id: string;
	upload_date: string;
	user: number;
}

export interface FileContextMenuProps {
	file: FileType;
}

export interface DeleteConfirmModalProps {
	showModal: boolean;
	onConfirm: () => void;
	onClose: () => void;
}

export interface UploadFileResponse  {
    data?: FileType;
	error?: FetchBaseQueryError | SerializedError;
}

export interface EditFileType {
	editFile: FileType | null;
}

export interface ShowPasswordProps {
	showPassword: boolean;
	setShowPassword: (show: boolean) => void;
}

export interface ErrorProps {
	error: FetchBaseQueryError | SerializedError | undefined
}
