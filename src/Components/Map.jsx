import React, {useEffect, useState} from 'react';
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
import {Button} from "flowbite-react";
import {CreateSuperHeroForm} from "./CreateSuperHeroForm";


const Map = ({incidents, incidentTypes}) => {
    const [map, setMap] = useState(null);
    const [createIncidentPosition, setCreateIncidentPosition] = useState(null);
    const [city, setCity] = useState(null);
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



    const addSuperheroButtonClick = () => {

    };

    function LocationMarker() {

        const handleClick = () => {
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
            setIsModalOpen(true);
        };

        const map = useMapEvents({
                                     click(e) {
                                         setCreateIncidentPosition(e.latlng);
                                     },
                                 });


        return createIncidentPosition === null ? null : (
            <Marker position={createIncidentPosition}
                    icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                <Popup>
                    <div className="flex flex-wrap gap-2">
                        <h1>Créer un incident</h1>
                        <div>
                            <Button onClick={handleClick}>Créer un incident</Button>
                            {isModalOpen &&
                            <CreateIncidentModal
                                createIncidentPosition={createIncidentPosition}
                                city={city}
                                incidentTypes={incidentTypes}
                            />
                            }
                        </div>
                    </div>
                </Popup>
            </Marker>
        )
    }


    return (
        <div>
            <div>
                <h2 className="page-header">Carte des incidents</h2>
                <div className="max-w-sm">
                    <MapContainer
                        center={[49.4402, 1.0931]}
                        zoom={13}
                        style={{height: '300px'}}
                        whenCreated={setMap}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                        />
                        <LocationMarker/>
                        {Array.isArray(incidents) && incidents.length > 0 ? (
                            incidents.map((incident) => {
                                const {latitude, longitude, incidentTypeId, city} = incident;
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
                                                    <p>Afficher la liste des super héros pouvant résoudre cet incident
                                                        dans un rayon de 50 km</p>
                                                    <button onClick={addSuperheroButtonClick}>Afficher la liste</button>
                                                    {city && <p>City: {city}</p>}
                                                </Popup>
                                            </Marker>
                                        );
                                    }
                                }
                                return null;
                            })
                        ) : null}
                    </MapContainer>
                </div>
            </div>
            <CreateSuperHeroForm
                incidentTypes={ incidentTypes }
                markerPosition={ createIncidentPosition }/>
        </div>
    );
};


export default Map;
