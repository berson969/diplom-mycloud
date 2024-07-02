import React from 'react';
import "../css/logo.css"

const Logo: React.FC = () => {
	const prefix = process.env.BUILD_PREFIX || '';

	return (
		<div className="col-md-3 mb-2 mb-md-0">
			<a href={`/${prefix}`}  className="d-inline-flex link-body-emphasis text-decoration-none my-logo">
				<img
					src={`${prefix}logo_mycloud.png`}
					alt="My Cloud"
					className="logo-image img-fluid me-2"
				/>
				<span className="logo-text">MY CLOUD</span>
			</a>
		</div>
	);
};

export default Logo;
