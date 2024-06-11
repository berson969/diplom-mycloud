import React, {useState} from 'react';
import Menu, { Item as MenuItem } from 'rc-menu';
import Dropdown from 'rc-dropdown';
import 'rc-dropdown/assets/index.css';

import {FileContextMenuProps} from "../models";
import {useDeleteFileMutation, useGetUsersFilesQuery} from "../api";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUser, getView} from "../selectors";
import {setActiveState} from "../slices/currentUserSlice.ts";
import {AppDispatch} from "../store";
import FileList from "./FileList.tsx";
import FileGrid from "./FileGrid.tsx";
import DeleteConfirmModal from "./DeleteConfirmModal.tsx";

const FileContextMenu: React.FC<FileContextMenuProps> = ({ file } ) => {
    const dispatch = useDispatch<AppDispatch>();

    const currentUser = useSelector(getCurrentUser);
    const [ deleteFile ] = useDeleteFileMutation();
    const { refetch } = useGetUsersFilesQuery(currentUser);
    const view = useSelector(getView);

    const [showModal, setShowModal] = useState(false);

    const handleEdit = () => {
        console.log("edit ", file )
        dispatch(setActiveState('edit'))
    }

    const handleDelete = async () => {
        setShowModal(true);
    }

    const handleConfirm = async () => {
        if (!currentUser) return;

        try {
            const data = {
                id: file.id,
                user_folder: currentUser.user_folder,
            }
            const response = await deleteFile(data);
            console.error('Успешное удаление:', response);
            refetch();
            dispatch(setActiveState('auth'))
            setShowModal(false);
        } catch (err: any) {
            const message = err.data.message ? err.data.message : 'неверное имя пользователя или пароль';
            console.error('Ошибка входа:', message);
        }
    }

    const handleClose = () => {
        setShowModal(false);
    };

    const menuItems = (
        <Menu style={{ width: 200 }} className="dropdown-menu show">
            <MenuItem key="edit" onClick={handleEdit} className="dropdown-item fst-italic px-3 py-2">
                Редактировать
            </MenuItem>
            <MenuItem key="delete" onClick={handleDelete} className="dropdown-item  fst-italic px-3 py-2">
                Удалить
            </MenuItem>
        </Menu>
    )

    return (
        <>
        <Dropdown
            trigger={['contextMenu']}
            overlay={menuItems}
            animation="slide-up"
            alignPoint
        >
            <div key={file.id} className={view === 'list' ? '' : 'col-md-3' }>
                {view === 'list'
                    ? <FileList file={file} />
                    : <FileGrid file={file} />
                }
            </div>
        </Dropdown>
        <DeleteConfirmModal
            showModal={showModal}
            onConfirm={handleConfirm}
            onClose={handleClose}
        />
        </>
    );
};

export default FileContextMenu;
