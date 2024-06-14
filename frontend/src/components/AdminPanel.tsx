import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {useGetAllUsersQuery} from "../api";
import {getLoginUser} from "../selectors";
import Loader from "./Loader.tsx";
import ErrorAlert from "./ErrorAlert";
import {UserType} from "../models";
import {AppDispatch} from "../store";
import {setCurrentUser} from "../slices/usersSlice";
import getErrorMessage from "../hooks/getErrorMessage";

const AdminPanel: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const loginUser = useSelector(getLoginUser);
    const [ selectedUsername , setSelectedUsername ] = useState<string>('');
    const {data: users, isLoading, error} = useGetAllUsersQuery();

    useEffect(() => {
        if (loginUser) {
            setSelectedUsername(loginUser.username)
        }
    }, [])

    if (!loginUser || !loginUser.is_staff || !users) return null;
    if (isLoading) return <Loader />;

    if (error) {
        const errorMessage = getErrorMessage(error);
        return <ErrorAlert typeError="Ошибка при загрузке пользователей:" message={errorMessage} visible={false}/>;
    }

    const handleSetCurrentUser = (username: string) => {
        const user = users.find((user) => user.username === username);
        if (user) {
            dispatch(setCurrentUser(user));
            setSelectedUsername(username);
        } else {
            console.error(`Не удалось найти пользователя с username: ${username}`);
        }
    };


    return (
        <div className="container">
            <div className="row gx-2 p-4">
                <h5 className="col">Выберете пользователя</h5>
                <select
                    className="form-control col"
                    value={selectedUsername}
                    onChange={(event) => handleSetCurrentUser(event.target.value)}
                >
                    {users.map((user: UserType) => (
                        <option key={user.id} value={user.username} className="text-center">
                            {user.username}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default AdminPanel;
