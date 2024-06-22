import React from 'react';

const Loader: React.FC = () => {
	return (
		<div className="d-flex justify-content-center align-items-center">
			<div className="spinner-border text-primary" role="status" style={{ color: '#0dcaf0' }}>
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	);
};

export default Loader;
