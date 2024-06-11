import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";

import {useLoginUserMutation} from "../api";
import ErrorAlert from "./ErrorAlert.tsx";
import Loader from "./Loader.tsx";
import {setActiveState, setUser} from "../slices/currentUserSlice";


const Login: React.FC = () => {
	const dispatch = useDispatch();
	const [loginUser, { isLoading, error }] = useLoginUserMutation()
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string>('');

	useEffect(() => {
		const storedUsername = localStorage.getItem('username');
		const storedPassword = localStorage.getItem('password');

		if (storedUsername && storedPassword) {
			setUsername(storedUsername);
			setPassword(storedPassword);
			setRememberMe(true);
		}
	}, []);

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			if (!isLoading) {
				if (rememberMe) {
					localStorage.setItem('username', username);
					localStorage.setItem('password', password);
				} else {
					localStorage.removeItem('username');
					localStorage.removeItem('password');
				}
				const response = await loginUser({username, password});
				console.log('Успешный вход:', response.data);
				sessionStorage.setItem('currentUser', JSON.stringify(response.data.user));
				dispatch(setUser(response.data.user));
				dispatch(setActiveState('auth'))
			}
		} catch (err: any) {
			console.error('Ошибка входа:', err);
			const message = err.data.message ? err.data.message : 'неверное имя пользователя или пароль';
			setErrorMessage(message);
		}
	};

	return (
		<div className="container-sm">
			<div className="row">
				<div className="col-md-6 mx-auto">
					<h1 className="text-center mb-4">Вход</h1>

					<form method="post" onSubmit={handleLogin}>
						<div className="form-group mb-2">
							<label htmlFor="username">Имя пользователя:</label>
							<input
								type="text"
								value={username}
								className="form-control"
								id="username"
								placeholder="Введите имя пользователя"
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className="form-group mb-2">
							<label htmlFor="password">Пароль:</label>
							<input
								type="password"
								value={password}
								className="form-control"
								id="password"
								placeholder="Введите пароль"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="form-check mb-4">
							<input
								type="checkbox"
								className="form-check-input"
								id="rememberMe"
								checked={rememberMe}
								onChange={(e) => setRememberMe(e.target.checked)}
							/>
							<label className="form-check-label" htmlFor="rememberMe">Запомнить меня</label>
						</div>
						{isLoading && <Loader />}
						{error && <ErrorAlert typeError="Ошибка входа:" message={errorMessage} />}
						{!isLoading &&
							<button
								type="submit"
								className="btn btn-primary"
							>
								Логин
							</button>
						}
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
