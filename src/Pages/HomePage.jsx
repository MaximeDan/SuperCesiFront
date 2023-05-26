import Map from "../Components/Map";
import {NavBar} from "../Components/NavBar";
import {useEffect, useState} from "react";
import axios from "axios";


export const HomePage = () => {

	const [incidentTypes, setIncidentTypes] = useState([]);
	const [incidents, setIncidents] = useState([]);


	useEffect(() => {
		const fetchIncidentTypes = async () => {
			try {
				const response = await axios.post('https://localhost:44345/api/incidenttype/GetAll');
				const data = response.data;

				setIncidentTypes(data);

			} catch (error) {
				console.log('Error fetching incident types:', error);
			}
		};

		const fetchIncidents = async () => {
			try {
				const response = await axios.post('https://localhost:44345/api/incident/GetAll');
				const data = response.data;
				setIncidents(data);
			} catch (error) {
				console.log('Error fetching incidents:', error);
			}
		};

		fetchIncidents();
		fetchIncidentTypes();
	}, []);


	return (
		<div className="bg-gray-100">
			<NavBar />
			<div className="container mx-auto p-4">
				<Map
				incidents={incidents}
				incidentTypes={incidentTypes}/>
			</div>
		</div>
	);
};
