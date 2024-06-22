import "../css/images.css"
import React from 'react';

const Logout: React.FC = () => {
	return (
		<div className="text-center background">
			<div className="overlay"></div>
				<h2>Добро пожаловать в облачное хранилище My Cloud! </h2>
				<p className="mb-24">Перед началом работы, чтобы получить доступ к своим файлам войдите или зарегистрируйтесь</p>
		</div>
	);
};

export default Logout;
