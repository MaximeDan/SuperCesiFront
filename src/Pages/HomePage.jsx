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
		<div>
			<NavBar />
			<Map
			incidents={incidents}
			incidentTypes={incidentTypes}/>
		</div>
	);
};
