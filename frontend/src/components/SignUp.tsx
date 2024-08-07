import React, {useState} from 'react';
import {useCreateUserMutation} from "../api";
import {setActiveState} from "../slices/usersSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store";
import PasswordInput from "./PasswordInput.tsx";
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const SignUp: React.FC= () => {
	const dispatch = useDispatch<AppDispatch>()
	const [createUser] = useCreateUserMutation();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMessage, setErrorMessage ] = useState('')

	const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setErrorMessage('Пароли не совпадают');
			return;
		}

		try {
			const result = await createUser({ username, email, password });
			if (result.error ) {
                if ('data' in result.error && result.error?.data) {
                    const typedError: FetchBaseQueryError = result.error.data as FetchBaseQueryError;
                    if ('detail' in typedError) {
                        const error = typedError.detail;
                        console.error('Error creating user:', error);
                        setErrorMessage(`Ошибка:  ${error}`);
                    }
				} else {
					console.error('Error creating user (no data):', result.error);
					setErrorMessage('Ошибка: Не удалось получить детали ошибки.');
				}

			} else {
				console.log('User created successfully', result.data);
				dispatch(setActiveState('login'));
			}
		} catch (err) {
			console.error('Failed to create user:', err);
		}
	};

	return (
		<div className="container-sm">
			<div className="row">
				<div className="col-md-6 mx-auto">
					<h1 className="text-center mb-4">Регистрация</h1>

					<form method="post" onSubmit={handleCreateUser}>
						<div className="form-group mb-2">
							<label htmlFor="username">Имя пользователя:</label>
							<input
								type="text"
								value={username}
								className="form-control"
								id="username"
								placeholder="Введите имя пользователя"
								autoComplete="off"
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className="form-group mb-2">
							<label htmlFor="email">Email:</label>
							<input
								type="email"
								value={email}
								className="form-control"
								id="email"
								placeholder="Введите email"
								autoComplete="off"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="form-group mb-2 position-relative">
							<PasswordInput password={password} setPassword={setPassword} confirm={false} autoComplete={false}/>
						</div>
						<div className="form-group  mb-4 position-relative">
							<PasswordInput password={confirmPassword} setPassword={setConfirmPassword} confirm={true} autoComplete={false}/>
						</div>
						{errorMessage && (
							<div className="alert alert-danger" role="alert">
								{errorMessage}
							</div>
						)}
						<button
							type="submit"
							className="btn btn-primary"
						>
							Зарегистрироваться
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
