import React from "react";
import {useSelector} from "react-redux";

import Header from "./components/Header.tsx";
import Login from "./components/Login.tsx";
import SignUp from "./components/SignUp.tsx";
import Footer from "./components/Footer.tsx";
import Logout from "./components/Logout.tsx";
import Storage from "./components/Storage.tsx";
import usePersistedUser from "./hooks/persistedUser";
import {selectActiveState} from "./selectors";
import EditFileModal from "./components/EditFileModal.tsx";


const App: React.FC = () => {
	usePersistedUser();
	const activeState = useSelector(selectActiveState);
	console.log('activeState', activeState)

	const loginComponent = () => {
		switch (activeState) {
			case 'login':
				return <Login />;
			case 'sign-up':
				return <SignUp />;
			case 'logout':
				return <Logout />;
			case 'auth':
				return <Storage />;
			case 'edit':
				return <EditFileModal />;
			default:
				return null;
		}
	};

	return (
		<div className="container">
			<Header />
			{loginComponent()}
			<Footer />
		</div>
	);
};

export default App;
