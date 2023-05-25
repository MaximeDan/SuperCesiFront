import {Button, Modal} from "flowbite-react";
import {useEffect, useState} from "react";
import axios from "axios";

const SuperHeroesList = ({selectedIncidentType, incidentLatitude, incidentLongitude, superheroesData}) => {

	const [modalVisible, setModalVisible] = useState(true);

	const closeModal = () => {
		setModalVisible(false);
	};


	const calculateDistance = (latitude1, longitude1, latitude2, longitude2) => {
		const earthRadius = 6371; // Radius of the Earth in kilometers
		const lat1Rad = toRadians(latitude1);
		const lat2Rad = toRadians(latitude2);
		const latDiffRad = toRadians(latitude2 - latitude1);
		const lngDiffRad = toRadians(longitude2 - longitude1);

		const a =
			Math.sin(latDiffRad / 2) ** 2 +
			Math.cos(lat1Rad) *
			Math.cos(lat2Rad) *
			Math.sin(lngDiffRad / 2) ** 2;
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		return earthRadius * c;
	};

	const toRadians = (degrees) => {
		return (degrees * Math.PI) / 180;
	};

console.log(superheroesData)
	console.log(selectedIncidentType)
	return (
		<Modal show={modalVisible}>
			<Modal.Header>
				<div>Liste des super heros dans un rayon de 50 km</div>
			</Modal.Header>
			<Modal.Body>
				{superheroesData.length === 0 ? (
					<div>No superheroes found.</div>
				) : (
					<table>
						<thead>
						<tr>
							<th>Name</th>
							<th>Phone Number</th>
						</tr>
						</thead>
						<tbody>
						{superheroesData
							.filter(
								(superhero) =>
									superhero.incidentTypes &&
									superhero.incidentTypes.some(
										(incidentType) =>
											incidentType.name === selectedIncidentType.name
									) &&
									calculateDistance(
										superhero.latitude,
										superhero.longitude,
										incidentLatitude,
										incidentLongitude
									) <= 50
							)
							.map((superhero, index) => (
								<tr key={superhero.id}>
									<td>{superhero.name}
										<span style={{ marginLeft: '0.5rem' }}></span>
									</td>
									<td>
										{superhero.phoneNumber}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={closeModal}>Close</Button>
			</Modal.Footer>
		</Modal>
	);

};

export default SuperHeroesList;