import React, { useState } from 'react';
import './../Styles/loginPage.css';
import {Button, Checkbox, Label, TextInput} from "flowbite-react";

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		// TODO: Handle login logic here
		console.log('Login submitted');
	};

	return (
		<div className="login-page">
			<div className="login-container">
				<h2>Login</h2>
				<form className="flex flex-col gap-4">
					<div>
						<div className="mb-2 block">
							<Label
								htmlFor="email1"
								value="Your email"
							/>
						</div>
						<TextInput
							id="email1"
							type="email"
							placeholder="name@flowbite.com"
							required={true}
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label
								htmlFor="password1"
								value="Your password"
							/>
						</div>
						<TextInput
							id="password1"
							type="password"
							required={true}
						/>
					</div>
					<div className="flex items-center gap-2">
						<Checkbox id="remember" />
						<Label htmlFor="remember">
							Remember me
						</Label>
					</div>
					<Button type="submit">
						Submit
					</Button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
