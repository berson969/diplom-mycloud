import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {clearUser, setActiveState, setUser, setView} from '../slices/currentUserSlice';

const usePersistedUser = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const storedUser = sessionStorage.getItem('currentUser');
		const storeView = sessionStorage.getItem('view');
		if (storedUser) {
			dispatch(setUser(JSON.parse(storedUser)));
			dispatch(setActiveState('auth'));
			dispatch(setView(storeView ? storeView : 'list'))
		} else {
			dispatch(clearUser());
			dispatch(setActiveState('logout'));
		}

	}, [dispatch]);
};

export default usePersistedUser;
