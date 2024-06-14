import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {clearUser, setActiveState, setLoginUser, setView} from '../slices/usersSlice';

const usePersistedUser = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const storedLoginUser = sessionStorage.getItem('loginUser');
		const storeView = sessionStorage.getItem('view');
		if (storedLoginUser) {
			dispatch(setLoginUser(JSON.parse(storedLoginUser)));
			dispatch(setActiveState('auth'));
			dispatch(setView(storeView ? storeView : 'list'))
		} else {
			dispatch(clearUser());
			dispatch(setActiveState('logout'));
		}

	}, [dispatch]);
};

export default usePersistedUser;
