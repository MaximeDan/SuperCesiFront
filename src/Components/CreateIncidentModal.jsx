import React, { useState} from 'react';
import {Button, Label, Modal, Select, TextInput} from 'flowbite-react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const CreateIncidentModal = ({ createIncidentPosition, city, incidentTypes}) => {
    const { handleSubmit, register } = useForm();
    const [modalOpen, setModalOpen] = useState(true);

    const onSubmit = async (data) => {
        try {
            const { latitude, longitude, incidentTypeId, city, isResolved } = data;
            const incidentData = {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                isResolved: isResolved === 'true',
                incidentTypeId: parseInt(incidentTypeId),
                city: city || null
            };

            await axios.post('https://localhost:44345/api/incident/Create', incidentData);

            setModalOpen(false); // Close the modal
            window.location.reload(); // Reload the page
        } catch (error) {
            console.log('Error creating incident:', error);
        }
    };


    const { lat, lng } = createIncidentPosition || {};

    return (
        <Modal dismissible show={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="incident-form">
                <h3>Créer un incident</h3>
                <p>Cliquez sur le lieu de l'incident sur la carte</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="small" value="Latitude" />
                        </div>
                        <TextInput
                            id="small"
                            type="text"
                            sizing="md"
                            {...register('latitude')}
                            defaultValue={lat || ''}
                            className="fb-input"
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="small" value="Longitude" />
                        </div>
                        <TextInput
                            id="small"
                            type="text"
                            sizing="md"
                            {...register('longitude')}
                            defaultValue={lng || ''}
                            className="fb-input"
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="small" value="Ville" />
                        </div>
                        <TextInput
                            id="small"
                            type="text"
                            sizing="md"
                            {...register('city')}
                            defaultValue={city || ''}
                            className="fb-input"
                        />
                    </div>
                    <div id="select">
                        <div className="mb-2 block">
                            <Label htmlFor="incidents" value="Type d'incident" />
                        </div>
                        <Select id="incidents" required={true} {...register('incidentTypeId')}>
                            {incidentTypes.map((incidentType) => (
                                <option key={incidentType.id} value={incidentType.id}>
                                    {incidentType.displayName}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <div>
                            <Button  pill={true} type="submit">
                                Créer Incident
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default CreateIncidentModal;
