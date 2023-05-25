import React from 'react';
import '../Styles/loginPage.css';
import {NavBar} from "../Components/NavBar";
import LoginForm from "../Components/LoginForm";

const LoginPage = () => {

	return (
		<div>
			<NavBar />
			<LoginForm />
		</div>
	);
};

export default LoginPage;
