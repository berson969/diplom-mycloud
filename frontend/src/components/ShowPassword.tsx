import React from 'react';
import {ShowPasswordProps} from "../models";

const ShowPassword : React.FC< ShowPasswordProps> = ({showPassword, setShowPassword}) => {
    return (
        <button
            type="button"
            className="btn"
            style={{ fontSize: "1.5em", position: "absolute", right: 20, top: "75%", transform: "translateY(-50%)" }}
            onClick={() => setShowPassword(!showPassword)}
        >
            <i className={showPassword ? "bi bi-eye-slash opacity-50" : "bi bi-eye opacity-50"}></i>
        </button>
    );
};

export default ShowPassword;
