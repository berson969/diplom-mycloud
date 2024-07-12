import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppDispatch } from '../store';
import { useUpdateUserMutation } from '../api';
import ErrorAlert from './ErrorAlert';
import { getLoginUser } from '../selectors';
import {setActiveState, setLoginUser} from "../slices/usersSlice";
import getErrorMessage from "../hooks/getErrorMessage";
import Loader from "./Loader.tsx";
import PasswordInput from "./PasswordInput.tsx";
import {ErrorProps} from "../models";

const UpdateUser: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const loginUser = useSelector(getLoginUser);
    if (!loginUser) return;
    const [updateUser, {isLoading}] = useUpdateUserMutation();

    const [ username, setUsername] = useState<string>(loginUser.username);
    const [ email, setEmail] = useState<string>(loginUser.email);
    const [ password, setPassword] = useState<string>('');
    const [ confirmPassword, setConfirmPassword] = useState('');
    const [ errorMessage, setErrorMessage] = useState('');

    const handleSave = async () => {
        if (password !== confirmPassword) {
            setErrorMessage('Пароли не совпадают');
            return;
        }


        const updateData = {
            id: loginUser.id,
            data: {
                username,
                email,
                ...(password && { password }),
            }
        };
        console.log("updateData", updateData)
        try {
            const response = await updateUser(updateData);
            if (response && response.error && 'error' in response) {
                setErrorMessage(getErrorMessage(response.error));
            } else {
                console.log("response Update", response)
                dispatch(setLoginUser(response.data));
                dispatch(setActiveState('auth'));
				setErrorMessage('')
            }
        } catch (error) {
			const errorMessage = getErrorMessage(error);
            setErrorMessage(errorMessage);
        }
    };
    if (isLoading) return <Loader />;
    return (
        <div className="container-sm">
            {errorMessage && (
                <ErrorAlert typeError="Ошибка:" message={errorMessage} visible={true} />
            )}
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <h1 className="text-center mb-4">Изменение данных пользователя</h1>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Имя пользователя</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 position-relative">
                        <PasswordInput password={password} setPassword={setPassword} confirm={false} autoComplete={false}/>
                    </div>
                    <div className="mb-3 position-relative">
                        <PasswordInput password={confirmPassword} setPassword={setConfirmPassword} confirm={true} autoComplete={false}/>
                    </div>
                    <div className="modal-footer gap-2">
                        <button type="button" className="btn btn-secondary" onClick={() => dispatch(setActiveState('auth'))}>Отмена</button>
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Сохранить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;
