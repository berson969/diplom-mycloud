import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import Logo from "./Logo.tsx";
import "../css/line.css";
import {useLogoutActionMutation} from "../api";
import {getLoginUser, selectActiveState} from "../selectors";
import { AppDispatch } from '../store';
import {clearUser, setActiveState} from "../slices/usersSlice";

const Header: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const [logoutUser, { isLoading }] = useLogoutActionMutation()
	const loginUser = useSelector(getLoginUser);
	const activeState = useSelector(selectActiveState)
	const login = loginUser ? loginUser.username : null

	const handleButton =  (tag: string) => {
		if (tag) {
			dispatch(setActiveState(tag))
		}
	}
	const handleLogout = async () => {
		try {
			if (!isLoading && loginUser) {
				const response = await logoutUser(loginUser);
				console.log('Успешный выход:', response);
                sessionStorage.removeItem('loginUser');
				dispatch(clearUser())
				dispatch(setActiveState('logout'))
			}
		}  catch (err: any) {
		console.error('Ошибка выхода:', err);
		}

	}

	const handleEditUser = (e: React.MouseEvent) => {
		e.preventDefault();
		dispatch(setActiveState('update'));
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
					{login &&  <a
						className="username me-5"
						href="#"
						onClick={(e)=> handleEditUser(e)}
					>
						{login}
					</a>}
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
			<div className="line-container text-center  mb-5">
				<hr className="thick-line mb-4" />
				<hr className="thin-line " />
			</div>
		</div>

	);
};

export default Header;
