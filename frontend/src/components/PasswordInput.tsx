import React, {useState} from 'react';
import ShowPassword from "./ShowPassword.tsx";

const PasswordInput: React.FC<{password: string, setPassword: (password: string) => void, confirm: boolean}>  = ({ password, setPassword, confirm }) => {

    const [ showPassword, setShowPassword ] = useState<boolean>(false)

    return (
        <>
            <label htmlFor={confirm ? '0' : '1'}>{confirm ? 'Подтвердите пароль:' : 'Пароль:'}</label>
            <input
                type={showPassword ? "text" : "password"}
                value={password}
                className="form-control mt-2"
                id={confirm ? '0' : '1'}
                placeholder="Введите пароль"
                onChange={(e) => setPassword(e.target.value)}
            />
            <ShowPassword showPassword={showPassword} setShowPassword={setShowPassword} />
        </>
    );
};

export default PasswordInput;
