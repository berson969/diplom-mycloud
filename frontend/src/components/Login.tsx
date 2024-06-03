import React, {useState} from 'react';
import {useLoginUserMutation} from "../api";

const Login: React.FC = () => {
	const [loginUser, { isLoading, error }] = useLoginUserMutation()
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			if (!isLoading) {
				const response = await loginUser({username, password});
				console.log('Успешный вход:', response, response.data);
			}
			// Дополнительная логика после успешного входа
		} catch (error) {
			console.error('Ошибка входа:', error);
			// Дополнительная логика в случае ошибки входа
		}
	};

	return (
		<div className="container-sm">
			<div className="row">
				<div className="col-md-6 mx-auto">
					<h1 className="text-center mb-4">Вход</h1>

					<form onSubmit={handleLogin}>
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
							/>
							<label className="form-check-label" htmlFor="rememberMe">Запомнить меня</label>
						</div>
						<button
							type="submit"
							className="btn btn-primary"
							style={{ color: '#fff', background: '#0dcaf0', borderColor: '#0dcaf0' }}
						>
							Логин
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
