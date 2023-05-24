import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';
import '../Styles/HomePage.css';
import L, {Icon} from 'leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import CreateIncidentModal from "./CreateIncidentModal";
import axios from 'axios';


// Import marker icons for different incident types
import fireIcon from '../icons/fire-truck.png';
import carAccidentIcon from '../icons/car-accident.png';
import boatAccidentIcon from '../icons/sinking.png';
import planeAccidentIcon from '../icons/airplane.png';
import gasLeakIcon from '../icons/gas.png';
import landSlideIcon from '../icons/landslide.png';
import robberyIcon from '../icons/robbery.png';
import snakesInvasionIcon from '../icons/snakes.png';
import prisonerEscapeIcon from '../icons/wall.png';
import strikeIcon from '../icons/activist.png';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import {Button, Card, Modal} from "flowbite-react";


const HomePage = () => {
    const [map, setMap] = useState(null);
    const [incidents, setIncidents] = useState([]);
    const [createIncidentPosition, setCreateIncidentPosition] = useState(null);
    const [createIncidentMode, setCreateIncidentMode] = useState(false);
    const [city, setCity] = useState(null);
    const [incidentTypes, setIncidentTypes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const iconMappings = {
        Fire: L.icon({
                         iconUrl: fireIcon,
                         iconSize: [32, 32],
                     }),
        CarAccident: L.icon({
                                iconUrl: carAccidentIcon,
                                iconSize: [32, 32],
                            }),
        BoatAccident: L.icon({
                                 iconUrl: boatAccidentIcon,
                                 iconSize: [32, 32],
                             }),
        PlaneAccident: L.icon({
                                  iconUrl: planeAccidentIcon,
                                  iconSize: [32, 32],
                              }),
        GasLeak: L.icon({
                            iconUrl: gasLeakIcon,
                            iconSize: [32, 32],
                        }),
        LandSlide: L.icon({
                              iconUrl: landSlideIcon,
                              iconSize: [32, 32],
                          }),
        Robbery: L.icon({
                            iconUrl: robberyIcon,
                            iconSize: [32, 32],
                        }),
        SnakeInvasion: L.icon({
                                  iconUrl: snakesInvasionIcon,
                                  iconSize: [32, 32],
                              }),
        PrisonerEscape: L.icon({
                                   iconUrl: prisonerEscapeIcon,
                                   iconSize: [32, 32],
                               }),
        Strike: L.icon({
                           iconUrl: strikeIcon,
                           iconSize: [32, 32],
                       }),
    };

    const createIncidentButtonClick = () => {
        setCreateIncidentMode(true);

    };
    const handleMapClick = (e) => {
        if (createIncidentMode) {
            setCreateIncidentPosition(e.latlng);
            setIsModalOpen(true);
        }

    };

    const handleModalClick = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    const addSuperheroButtonClick = () => {

    };

    function LocationMarker() {

        const map = useMapEvents({
            click(e) {
                setCreateIncidentPosition(e.latlng);
            },
        });

        useEffect(() => {
            if (createIncidentPosition) {
                const geocoder = L.Control.Geocoder.nominatim();
                geocoder.reverse(
                    createIncidentPosition,
                    map.options.crs.scale(map.getZoom()),
                    (results) => {
                        if (results && results.length > 0) {
                            const city = results[0].properties.address.city || '';
                            setCity(city);
                        }
                    }
                );
            }
        }, [createIncidentPosition, map]);

        return createIncidentPosition === null ? null : (
            <Marker position={createIncidentPosition}
                    icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                <Popup>
                    <h2>Créer un incident</h2>
                    <button onClick={createIncidentButtonClick}>Créer un incident</button>
                </Popup>
            </Marker>
        )
    }

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
            <h2 className="page-header">Dashboard</h2>
            <div className="max-w-sm">
                <Card>
                    <MapContainer
                        center={[49.4402, 1.0931]}
                        zoom={13}
                        style={{ height: '300px' }}
                        whenCreated={setMap}
                        onClick={handleMapClick}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                        />
                        <LocationMarker />
                        {incidents.map((incident) => {
                            const { id, latitude, longitude, incidentTypeId, city } = incident;
                            if (typeof latitude !== 'undefined' && typeof longitude !== 'undefined') {
                                const incidentType = incidentTypes.find((type) => type.id === incidentTypeId);
                                if (incidentType) {
                                    return (
                                        <Marker
                                            key={incident.id}
                                            position={[latitude, longitude]}
                                            icon={iconMappings[incidentType.name]}
                                        >
                                            <Popup>
                                                <h2>{incidentType.displayName}</h2>
                                                <p>Afficher la liste des super héros pouvant résoudre cet incident dans un rayon de 50 km</p>
                                                <button onClick={addSuperheroButtonClick}>Afficher la liste</button>
                                                {city && <p>City: {city}</p>}
                                            </Popup>
                                        </Marker>
                                    );
                                }
                            }
                            return null;
                        })}
                    </MapContainer>
                    <div>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Noteworthy technology acquisitions 2021
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                        </p>
                    </div>
                </Card>
            </div>

            <div className="row">
                <div className="col-6">
                    <div className="incident-form">
                        {createIncidentMode && (
                            <React.Fragment>
                                <CreateIncidentModal
                                    createIncidentPosition={createIncidentPosition}
                                    city={city}
                                    incidentTypes={incidentTypes}
                                    isOpen={isModalOpen}
                                    onClose={!isModalOpen}
                                />
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default HomePage;
