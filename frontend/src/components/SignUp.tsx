import React, {useState} from 'react';
import {useCreateUserMutation} from "../api";

const SignUp: React.FC= () => {
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
			if (result.error) {
				console.error('Error creating user:', result.error);
			} else {
				console.log('User created successfully', result.data);
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
								onChange={(e) => setEmail(e.target.value)}
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
						<div className="form-group  mb-4">
							<label htmlFor="confirmPassword">Подтверждение пароля:</label>
							<input
								type="password"
								value={confirmPassword}
								className="form-control"
								id="confirmPassword"
								placeholder="Подтвердите пароль"
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
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
