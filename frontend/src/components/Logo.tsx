import React from 'react';
import "../css/logo.css"

const Logo: React.FC = () => {
	return (
		<div className="col-md-3 mb-2 mb-md-0">
			<a href="/" className="d-inline-flex link-body-emphasis text-decoration-none my-logo">
				<img
					src="../../public/logo_mycloud.png"
					alt="My Cloud"
					className="logo-image img-fluid me-2"
				/>
				{/*<i*/}
				{/*	className="bi bi-cloud-download fa-5x"*/}
				{/*	aria-label="My Cloud"*/}
				{/*></i>*/}
				<span className="logo-text">MY CLOUD</span>
			</a>
		</div>
	);
};

export default Logo;
