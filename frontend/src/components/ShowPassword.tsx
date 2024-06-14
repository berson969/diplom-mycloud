import React from 'react';
import {ShowPasswordProps} from "../models";

const ShowPassword : React.FC< ShowPasswordProps> = ({showPassword, setShowPassword}) => {
    return (
        <button
            className="btn btn-secondary"
            style={{ position: "absolute", right: 10, top: 15 }}
            onClick={() => setShowPassword(!showPassword)}
        >
            <span className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></span>
        </button>
    );
};

export default ShowPassword;
