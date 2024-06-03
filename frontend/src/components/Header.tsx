import React from 'react';
import Logo from "./Logo.tsx";
import {HeaderProps} from "../models";

const Header: React.FC<HeaderProps> = ({ activeState, setActiveState }) => {
	return (
		<div className="container">
			<header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
				<Logo />
				<h1 className="col-md-6">Облачное хранилище My Cloud</h1>

				<div className="col-md-3 text-end">
					{activeState !== 'login' && (
						<button
							type="button"
							className="btn btn-outline-primary me-2"
							onClick={() => setActiveState('login')}
							style={{ color: '#0dcaf0', background: '#fff', borderColor: '#0dcaf0'}}
						>
							Login
						</button>
					)}
					{activeState !== 'sign-up' && (
						<button
							type="button"
							className="btn btn-primary me-2"
							onClick={() => setActiveState('sign-up')}
							style={{ color: '#fff', background: '#0dcaf0', borderColor: '#0dcaf0' }}
						>
							Sign-up
						</button>
					)}
					{activeState === 'auth' && (
						<button
							type="button"
							className="btn btn-outline-primary me-2"
							onClick={() => setActiveState('logout')}
							style={{ color: '#0dcaf0', background: '#fff', borderColor: '#0dcaf0'}}
						>
							Logout
						</button>
					)}
				</div>
			</header>
		</div>

	);
};

export default Header;
