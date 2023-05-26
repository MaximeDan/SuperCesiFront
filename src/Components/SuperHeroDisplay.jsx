import {useEffect, useState} from "react";
import axios from "axios";
import {Table} from "flowbite-react";

export const SuperHeroList = () => {
	const [superheroes, setSuperheroes] = useState([]);

	useEffect(() => {
		// Fetch the list of registered superheroes from the API
		axios
			.post("https://localhost:44345/api/superhero/getall")
			.then((response) => {
				setSuperheroes(response.data);
			})
			.catch((error) => {
				console.error("Error fetching superheroes", error);
			});
	}, []);

	return (
		<div className="superhero-list">
			<h3>Liste des super héros enregistrés</h3>
			<Table>
				<Table.Head>
					<Table.HeadCell>
						Name
					</Table.HeadCell>
					<Table.HeadCell>
						Phone Number
					</Table.HeadCell>
					<Table.HeadCell>
						Latitude
					</Table.HeadCell>
					<Table.HeadCell>
						Longitude
					</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y">
				{superheroes.map((superhero) => (
					<tr key={superhero.id}>
						<td>{superhero.name}</td>
						<td>{superhero.phoneNumber}</td>
						<td>{superhero.latitude}</td>
						<td>{superhero.longitude}</td>
					</tr>
				))}
				</Table.Body>
			</Table>
		</div>
	);
};