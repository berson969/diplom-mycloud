import React, {useEffect} from 'react';
import {DeleteConfirmModalProps} from "../models";
import Modal from 'bootstrap/js/dist/modal';

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ showModal, onClose, onConfirm } ) => {

    useEffect(() => {
        const modalElement = document.getElementById('deleteConfirmModal');
        if (modalElement) {
            const modal = new Modal(modalElement);
            if (showModal) {
                modal.show();
            } else {
                modal.hide();

            }
        }
    }, [showModal]);

    return (
        <div
            className={`modal fade ${showModal ? 'show' : ''}`}
            id="deleteConfirmModal"
            tabIndex={-1}
            aria-labelledby="deleteConfirmModalLabel"
            aria-hidden={true}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="deleteConfirmModalLabel">Подтвердите удаление</h5>
                        <button type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={onClose}
                        />
                    </div>
                    <div className="modal-body">
                        Вы уверены, что хотите удалить файл?
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={onClose}
                        >
                            Отмена
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={onConfirm}
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
