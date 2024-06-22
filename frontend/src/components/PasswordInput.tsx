import React, {useState} from 'react';
import ShowPassword from "./ShowPassword.tsx";

const PasswordInput: React.FC<{password: string, setPassword: (password: string) => void, confirm: boolean, autoComplete: boolean}>  = ({ password, setPassword, confirm, autoComplete }) => {

    const [ showPassword, setShowPassword ] = useState<boolean>(false)

    return (
        <>
            <label htmlFor={confirm ? 'confirmPassword' : 'password'}>{confirm ? 'Подтвердите пароль:' : 'Пароль:'}</label>
            <input
                type={showPassword ? "text" : "password"}
                value={password}
                className="form-control mt-2"
                id={confirm ? 'confirmPassword' : 'password'}
                placeholder="Введите пароль"
				autoComplete={autoComplete ? "on" : "off"}
                onChange={(e) => setPassword(e.target.value)}
            />
            <ShowPassword showPassword={showPassword} setShowPassword={setShowPassword} />
        </>
    );
};

export default PasswordInput;
