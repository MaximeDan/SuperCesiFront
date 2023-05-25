import React, { useState } from 'react';
import '../Styles/loginPage.css';
import {Button, Checkbox, Label, TextInput} from "flowbite-react";
import {useForm} from "react-hook-form";
import axios from "axios";

const LoginPage = () => {
	const { handleSubmit, register } = useForm();

	const onSubmit = async (user) => {
		try {
			const {email, password} = user;
			const userData = {
				email: email,
				password: password,
			};

			await axios.post('https://localhost:44345/api/auth/login', userData);

		} catch (error) {
			console.log('Error creating incident:', error);
		}
	};

	return (
		<div className="login-page">
			<div className="login-container">
				<h2>Login</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
							placeholder="batman@example.com"
							{...register('email')}
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
							{...register('password')}
							required={true}
						/>
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
