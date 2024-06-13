import React from 'react';
import {ErrorAlertProps} from "../models";
import {setActiveState} from "../slices/currentUserSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store";

const ErrorAlert : React.FC<ErrorAlertProps> = ({typeError, message, visible}) => {
	const dispatch = useDispatch<AppDispatch>()
	const onBack = () => {
		dispatch(setActiveState('auth'))
	}

	return (
		<div className="alert alert-danger d-flex justify-content-between">
			<p className="flex-grow-1">{`${typeError} ${message}`}</p>
			{visible && (
			<button className="btn btn-danger" onClick={onBack}>
				Выйти
			</button>
			)}
		</div>
	);
};

export default ErrorAlert;
