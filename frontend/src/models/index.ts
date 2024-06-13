import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

export interface ActiveStateProps {
	activeState?: string | null;
	setActiveState: (component: string) => void;
	currentUser?: UserType;
}

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
	user_folder?: string;
	is_authenticated: boolean;
}

export interface CurrentUserProps {
	currentUser: UserType | null;
	activeState: 'logout' | 'login' | 'auth' | 'sign-up' | 'edit';
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

export interface ContextMenuProps {
	file: FileType;
	onEdit: (id: number) => void;
	onDelete: (id: number) => void;
}

export interface FileContextMenuProps {
	file: FileType;
}

export interface DeleteConfirmModalProps {
	showModal: boolean;
	onConfirm: () => void;
	onClose: () => void;
}

export interface FileEditModalProps {
	file: FileType;
}

export interface UploadFileResponse  {
    data?: FileType;
	error?: FetchBaseQueryError | SerializedError;
}
