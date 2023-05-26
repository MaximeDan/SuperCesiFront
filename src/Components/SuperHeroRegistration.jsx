import {CreateSuperHeroForm} from "./CreateSuperHeroForm";
import {useState} from "react";
import {Button} from "flowbite-react";

export const SuperHeroRegistration = ({ markerPosition, incidentTypes }) => {
	const [showForm, setShowForm] = useState(false);
	const [buttonClicked, setButtonClicked] = useState(false);

	const handleToggleForm = () => {
		setShowForm(true);
		setButtonClicked(true);
	};

	return (
		<div>
			<p>Vous voulez aider ? Vous avez des capacités extraordinaires ?</p>
			<p>Rejoignez-nous !</p>
			{!buttonClicked && (
				<Button onClick={handleToggleForm}>S'enregistrer</Button>
			)}
			{showForm && (
				<CreateSuperHeroForm
					markerPosition={markerPosition}
					incidentTypes={incidentTypes}
				/>
			)}
		</div>
	);
};