import React from 'react';

const Footer: React.FC = () => {
	return (
		<div className="">
			<footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4  border-top">
				<div className="col-md-4 d-flex align-items-center">
					<a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
						<img
							src="../../public/logo_mycloud.png"
							alt="My Cloud"
							className="logo-image-small img-fluid me-2"
						/>
					</a>
					<span className="mb-3 mb-md-0 text-body-secondary">© 2024 berson969</span>
				</div>
				<ul className="nav col-md-4 justify-content-end list-unstyled">
					<li className="nav-item ms-1"><a className="nav-link text-body-secondary" href="#"><i className="bi bi-twitter fs-4"></i></a></li>
					<li className="nav-item ms-1"><a className="nav-link text-body-secondary" href="#"><i className="bi bi-instagram fs-4"></i></a></li>
					<li className="nav-item ms-1"><a className="nav-link text-body-secondary" href="#"><i className="bi bi-facebook fs-4"></i></a></li>
				</ul>
			</footer>
		</div>
	);
};

export default Footer;
