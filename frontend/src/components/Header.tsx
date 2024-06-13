import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import Logo from "./Logo.tsx";
import {useLogoutUserMutation} from "../api";
import {getCurrentUser, selectActiveState} from "../selectors";
import { AppDispatch } from '../store';
import {clearUser, setActiveState} from "../slices/currentUserSlice";

const Header: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const [logoutUser, { isLoading }] = useLogoutUserMutation()
	const currentUser = useSelector(getCurrentUser);
	const activeState = useSelector(selectActiveState)
	const login = currentUser ? currentUser.username : null
	console.log('login', login)
	console.log('activeState', activeState)

	const handleButton =  (tag: string) => {
		if (tag) {
			dispatch(setActiveState(tag))
		}
	}
	const handleLogout = async () => {
		try {
			if (!isLoading && currentUser) {
				const response = await logoutUser(currentUser);
				console.log('Успешный выход:', response);
                sessionStorage.removeItem('currentUser');
				dispatch(clearUser())
				dispatch(setActiveState('logout'))
			}
		}  catch (err: any) {
		console.error('Ошибка выхода:', err);
		}

	}

	return (
		<div className="container">
			<header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
				<Logo />
				<h1 className="col-md-6">Облачное хранилище MyCloud</h1>

				<div className="col-md-3 text-end">
					{!login  && ['logout', 'sign-up', ].includes(activeState) && (
						<button
							type="button"
							className="btn btn-outline-primary me-2"
							onClick={() => handleButton('login')}
						>
							Login
						</button>
					)}
					{!login  && ['login', 'logout', ].includes(activeState) && (
						<button
							type="button"
							className="btn btn-primary me-2"
							onClick={() => handleButton('sign-up')}
						>
							Sign-up
						</button>
					)}
					{login &&  <span className="username me-5">{login}</span>}
					{login && (
							<button
								type="button"
								className="btn btn-outline-primary me-2"
								onClick={handleLogout}
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
