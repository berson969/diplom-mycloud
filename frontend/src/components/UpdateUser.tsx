import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppDispatch } from '../store';
import { useUpdateUserMutation } from '../api';
import ErrorAlert from './ErrorAlert';
import { getLoginUser } from '../selectors';
import {setActiveState, setLoginUser} from "../slices/usersSlice";
import getErrorMessage from "../hooks/getErrorMessage";
import ShowPassword from "./ShowPassword.tsx";
import Loader from "./Loader.tsx";

const UpdateUser: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const loginUser = useSelector(getLoginUser);
    if (!loginUser) return;
    const [updateUser, {isLoading}] = useUpdateUserMutation();

    const [ username, setUsername] = useState(loginUser.username);
    const [ email, setEmail] = useState(loginUser.email);
    const [ password, setPassword] = useState('');
    const [ showPassword, setShowPassword ] = useState<boolean>(false)
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

        try {
            const response = await updateUser(updateData);
            if (response && response.error && 'error' in response) {
                setErrorMessage(getErrorMessage(response.error));
            } else {
                console.log("response Update", response)
                dispatch(setLoginUser(response.data));
                dispatch(setActiveState('auth'));
            }
        } catch (error) {
            setErrorMessage(getErrorMessage(error || 'Произошла ошибка при обновлении пользователя'));
        }
    };
    if (isLoading) return <Loader />;
    return (
        <div>
            {errorMessage && (
                <ErrorAlert typeError="Ошибка:" message={errorMessage} visible={true} />
            )}
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Имя пользователя</label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
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
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Пароль</label>
                <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <ShowPassword showPassword={showPassword} setShowPassword={setShowPassword} />
            </div>
            <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Подтвердите пароль</label>
                <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <ShowPassword showPassword={showPassword} setShowPassword={setShowPassword} />
            </div>
            <div className="modal-footer gap-2">
                <button type="button" className="btn btn-secondary" onClick={() => dispatch(setActiveState('auth'))}>Отмена</button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>Сохранить</button>
            </div>
        </div>
    );
};

export default UpdateUser;
