import React from 'react';
import '../Styles/RegisterPage.css';
import {Button, Label, TextInput} from "flowbite-react";
import axios from "axios";
import {useForm} from "react-hook-form";

const RegisterPage = () => {
	const { handleSubmit, register } = useForm();

	const onSubmit = async (user) => {
		try {
			const {email, password, confirmPassword} = user;
			const userData = {
				email: email,
				password: password,
				confirmPassword: confirmPassword
			};

			await axios.post('https://localhost:44345/api/auth/register', userData);

		} catch (error) {
			console.log('Error creating incident:', error);
		}
	};


	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<div>
				<div className="mb-2 block">
					<Label
						htmlFor="email2"
						value="Your email"
					/>
				</div>
				<TextInput
					id="email2"
					type="email"
					placeholder="batman@example.com"
					{...register('email')}
					required={true}
					shadow={true}
				/>
			</div>
			<div>
				<div className="mb-2 block">
					<Label
						htmlFor="password2"
						value="Your password"
					/>
				</div>
				<TextInput
					id="password2"
					type="password"
					{...register('password')}
					required={true}
					shadow={true}
				/>
			</div>
			<div>
				<div className="mb-2 block">
					<Label
						htmlFor="repeat-password"
						value="Repeat password"
					/>
				</div>
				<TextInput
					id="repeat-password"
					type="password"
					{...register('confirmPassword')}
					required={true}
					shadow={true}
				/>
			</div>
			<Button type="submit">
				Enregistrer un nouvel utilisateur
			</Button>
		</form>
	);
};

export default RegisterPage;
