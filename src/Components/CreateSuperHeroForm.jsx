import {Button, Label, Radio, Select, TextInput} from "flowbite-react";
import React, {useState} from "react";



export const CreateSuperHeroForm = (createIncidentPosition) => {

	const [formData, setFormData] = useState({
												 title: '',
												 description: '',
												 incidentType: '',
												 additionalField: '',
											 });
	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission and API call with the form data
		// ...
	};

	const { lat, lng } = createIncidentPosition || {};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className="super-hero-form">
			<h3>S'enregistrer</h3>
			<p>Cliquer sur la carte pour reseigner votre adresse</p>
			<form onSubmit={handleSubmit}>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="small"
							value="Nom"
						/>
					</div>
					<TextInput
						id="small"
						type="text"
						sizing="md"
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="small"
							value="Téléphone"
						/>
					</div>
					<TextInput
						id="small"
						type="text"
						sizing="md"
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="small"
							value="Latitude"
						/>
					</div>
					<TextInput
						id="small"
						type="text"
						sizing="md"
						value={ lat || ''}
						onChange={handleChange}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="small"
							value="Longitude"
						/>
					</div>
					<TextInput
						id="small"
						type="text"
						sizing="md"
						value={ lng || ''}
						onChange={handleChange}
					/>
				</div>
				<div id="select">
					<div className="mb-2 block">
						<Label
							htmlFor="incidents"
							value="Type d'incident"
						/>
					</div>
					<fieldset
						className="flex flex-col gap-4"
						id="radio"
					>
						<legend>
							Choose your favorite country
						</legend>
						<div className="flex items-center gap-2">
							<Radio
								id="united-state"
								name="countries"
								value="USA"
								defaultChecked={true}
							/>
							<Label htmlFor="united-state">
								United States
							</Label>
						</div>
						<div className="flex items-center gap-2">
							<Radio
								id="germany"
								name="countries"
								value="Germany"
							/>
							<Label htmlFor="germany">
								Germany
							</Label>
						</div>
						<div className="flex items-center gap-2">
							<Radio
								id="spain"
								name="countries"
								value="Spain"
							/>
							<Label htmlFor="spain">
								Spain
							</Label>
						</div>
						<div className="flex items-center gap-2">
							<Radio
								id="uk"
								name="countries"
								value="United Kingdom"
							/>
							<Label htmlFor="uk">
								United Kingdom
							</Label>
						</div>
						<div className="flex items-center gap-2">
							<Radio
								id="china"
								name="countries"
								value="China"
								disabled={true}
							/>
							<Label
								htmlFor="china"
								disabled={true}
							>
								China (disabled)
							</Label>
						</div>
					</fieldset>
				</div>
				<div>
					<Button
						color="createIncident"
						pill={true}
					>
						S'enregistrer
					</Button>
				</div>
			</form>
		</div>
	);
};