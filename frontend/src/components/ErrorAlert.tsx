import React from 'react';
import {ErrorAlertProps} from "../models";

const ErrorAlert : React.FC<ErrorAlertProps> = ({typeError, message}) => {
	return (
		<div className="alert alert-danger">
			{`${typeError} ${message}`}
		</div>
	);
};

export default ErrorAlert;
