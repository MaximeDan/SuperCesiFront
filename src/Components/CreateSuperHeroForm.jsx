import {Button, Checkbox, Label, TextInput} from "flowbite-react";
import React, {useEffect, useState} from "react";
import axios from "axios";


export const CreateSuperHeroForm = ({markerPosition, incidentTypes}) => {
	const [selectedItems, setSelectedItems] = useState([]);
	const { lat, lng } = markerPosition || { lat: '', lng: '' };
	const [formData, setFormData] = useState({
		name: '',
		phoneNumber: '',
		latitude: lat,
		longitude: lng,
	});

	useEffect(() => {
		setFormData((prevFormData) => ({
			...prevFormData,
			latitude: lat,
			longitude: lng,
		}));
	}, [lat, lng]);

	const handleItemChange = (event) => {
		const selectedItemId = event.target.value;
		const selectedItem = incidentTypes.filter((incidentType) =>
			selectedItemId.includes(incidentType.id)
		);
		const isItemSelected = selectedItems.some((item) =>
			selectedItemId.includes(item.id)
		);

		if (event.target.checked && !isItemSelected && selectedItems.length < 3) {
			setSelectedItems((prevState) => [...prevState, ...selectedItem]);
		} else if (!event.target.checked && isItemSelected) {
			setSelectedItems((prevState) =>
				prevState.filter((item) => !selectedItemId.includes(item.id))
			);
		}

		setFormData((prevFormData) => ({
			...prevFormData,
			incidentTypes: [...selectedItems, ...selectedItem],
		}));
	};


	const handleSubmit = (event) => {
		event.preventDefault();

		if (selectedItems.length === 0) {
			alert('Please select at least one item.');
			return;
		} else if (selectedItems.length > 3) {
			alert('Please select a maximum of three items.');
			return;
		}

		const superHeroData = {
			...formData,
			incidentTypes: selectedItems,
		};

		axios
			.post('https://localhost:44345/api/superhero/register', superHeroData)
			.then((response) => {
				// Handle the success response
				console.log('Form submitted successfully', response);
			})
			.catch((error) => {
				// Handle the error response
				console.error('Error submitting form', error);
			});
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
						id="name"
						type="text"
						sizing="md"
						value={formData.name}
						onChange={(event) => setFormData({ ...formData, name: event.target.value })}
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
						id="phoneNumber"
						type="text"
						sizing="md"
						value={formData.phoneNumber}
						onChange={(event) => setFormData({ ...formData, phoneNumber: event.target.value })}
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
						id="latitude"
						type="text"
						sizing="md"
						value={lat}
						onChange={(event) => setFormData({ ...formData, latitude: parseFloat(event.target.value) })}
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
						id="longitude"
						type="text"
						sizing="md"
						value={lng}
						onChange={(event) => setFormData({ ...formData, longitude: parseFloat(event.target.value) })}
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
											value={incidentType.id}
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