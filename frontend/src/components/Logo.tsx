import React from 'react';
import "../css/logo.css"
import { setActiveState } from '../slices/usersSlice';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';

const Logo: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
	const prefix = import.meta.env.BUILD_PREFIX || '';

    const handleReverse = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        dispatch(setActiveState('login'));
    }

	return (
		<div className="col-md-3 mb-2 mb-md-0">
			<a
				href="/"
				className="d-inline-flex link-body-emphasis text-decoration-none my-logo"
                onClick={handleReverse}
			>
				<img
					src={`${prefix}logo_mycloud.png`}
					alt="My Cloud"
					className="logo-image img-fluid me-2"
				/>
				<span className="logo-text p-3">MY CLOUD</span>
			</a>
		</div>
	);
};

export default Logo;
