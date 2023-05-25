import React from 'react';
import '../Styles/RegisterPage.css';
import {NavBar} from "../Components/NavBar";
import RegisterForm from "../Components/RegisterForm";

const RegisterPage = () => {

	return (
		<div>
			<NavBar />
			<RegisterForm />
		</div>
	);
};

export default RegisterPage;
