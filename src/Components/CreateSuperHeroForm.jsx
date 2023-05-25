import {Button, Checkbox, Label, Radio, Select, TextInput} from "flowbite-react";
import React, {useState} from "react";
import axios from "axios";


export const CreateSuperHeroForm = ({markerPosition, incidentTypes}) => {
	const [selectedItems, setSelectedItems] = useState([]);
	const { lat, lng } = markerPosition || {};

	const handleItemChange = (event) => {
		const selectedItem = event.target.value;

		// Check if the item is already selected
		const isItemSelected = selectedItems.includes(selectedItem);

		if (event.target.checked && !isItemSelected && selectedItems.length < 3) {
			setSelectedItems((prevState) => [...prevState, selectedItem]);
		} else if (!event.target.checked && isItemSelected) {
			setSelectedItems((prevState) =>
								 prevState.filter((item) => item !== selectedItem)
			);
		}
	};

	const handleSubmit = (event, superHero) => {
		event.preventDefault();

		if (selectedItems.length === 0) {
			alert('Please select at least one item.');
		} else if (selectedItems.length > 3) {
			alert('Please select a maximum of three items.');
		} else {

			const { latitude, longitude, incidentTypes } = superHero;
			const superHeroData = {
				latitude: parseFloat(latitude),
				longitude: parseFloat(longitude)

			};
			axios.post('https://localhost:44345/api/superhero/register', superHeroData)
				.then((response) => {
					// Handle the success response
					console.log('Form submitted successfully', response);
				})
				.catch((error) => {
					// Handle the error response
					console.error('Error submitting form', error);
				});
		}
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
					/>
				</div>
				<div id="select">
					<div className="mb-2 block">
						<Label
							htmlFor="incidents"
							value="Type d'incident"
						/>
					</div>
					<fieldset className="flex flex-col gap-4" id="radio">
						<legend>
							Choississez jusqu'à 3 types d'incidents que vous pouvez résoudre
						</legend>
						<div id="select">
							<div className="mb-2 block">
								<Label htmlFor="incidents" value="Type d'incident" />
							</div>
							<div className="flex flex-col gap-4" id="checkbox">
								{incidentTypes.map((incidentType) => (
									<div key={incidentType.id} className="flex items-center gap-2">
										<Checkbox
											id={incidentType.id}
											onChange={handleItemChange}
										/>
										<Label htmlFor={incidentType.id}>{incidentType.displayName}</Label>
									</div>
								))}
							</div>
						</div>
					</fieldset>
				</div>
				<div>
					<Button pill={true} type="submit">
						S'enregistrer
					</Button>
				</div>
			</form>
		</div>
	);
};