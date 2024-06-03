// import './index.css'
import React, {useState} from "react";
import Header from "./components/Header.tsx";
import Login from "./components/Login.tsx";
import SignUp from "./components/SignUp.tsx";
import Footer from "./components/Footer.tsx";
import Logout from "./components/Logout.tsx";
import Storage from "./components/Storage.tsx";

const App: React.FC = () => {
	const [activeState, setActiveState] = useState<string>('logout');

	const loginComponent = () => {
		if (activeState === 'login') {
			return <Login />;
		} else if (activeState === 'sign-up') {
			return <SignUp />;
		} else if (activeState === 'logout') {
			return <Logout />;
		}
		return <Storage />;
	};

	return (
		<div>
			<Header setActiveState={setActiveState} activeState={activeState}/>
			{loginComponent()}
			<Footer />
		</div>
	);
};

export default App;
