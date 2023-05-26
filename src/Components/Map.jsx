import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap} from 'react-leaflet';
import '../Styles/HomePage.css';
import L, {Icon} from 'leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import CreateIncidentModal from "./CreateIncidentModal";
import {CreateSuperHeroForm} from "./CreateSuperHeroForm";
import {Button, Card} from "flowbite-react";
import "leaflet.locatecontrol";
import '../Styles/Map.css'

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
import SuperHeroesList from "./SuperHeroesList";
import axios from "axios";
import {SuperHeroList} from "./SuperHeroDisplay";
import {SuperHeroRegistration} from "./SuperHeroRegistration";


const Map = ({incidents, incidentTypes}) => {
    const [createIncidentPosition, setCreateIncidentPosition] = useState(null);
    const [city, setCity] = useState(null);
    const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);
    const [isSuperHeroListModalOpen, setIsSuperHeroListModalOpen] = useState(false);
    const [superheroesData, setSuperheroesData] = useState([]);
    const [userLocation, setUserLocation] = useState(null);

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

    const LocateControl = () => {
        const map = useMap();

        useEffect(() => {
            const locateOptions = {
                position: "topright", // Set the position to "topright"
                drawCircle: false,
                flyTo: true,
                cacheLocation: true,
                strings: {
                    title: "Show my location",
                },
            };

            const locateControl = L.control.locate(locateOptions);
            locateControl.addTo(map);

            return () => {
                locateControl.remove();
            };
        }, [map]);

        return null;
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
            setIsIncidentModalOpen(true);
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
                            {isIncidentModalOpen &&
                                <div style={{ position: 'absolute', zIndex: '9999' }}>
                                    <CreateIncidentModal
                                    className="modal-component"
                                    createIncidentPosition={createIncidentPosition}
                                    city={city}
                                    incidentTypes={incidentTypes}
                                    onCloseModal={() => setIsIncidentModalOpen(false)}
                                />
                                </div>
                                }
                        </div>
                    </div>
                </Popup>
            </Marker>
        )
    }

    const addSuperheroButtonClick = () => {
        setIsSuperHeroListModalOpen(true)
    }

    const superheroes = async () => {
        try {
            const response = await axios.post('https://localhost:44345/api/superhero/getall');
            const data = response.data;

            setSuperheroesData(data);
        } catch (error) {
            console.log('Error fetching superheroes:', error);
            throw error;
        }
    };

    useEffect(() => {
        superheroes();
    }, []);

    const handleLocationFound = (e) => {
        setUserLocation(e.latlng);
    };

    return (
        <div className="container mx-auto" style={{display: 'flex'}}>
            <div style={{ width: '70vh', marginRight: '1rem' }}>
                <Card style={{ width: '100%', height: '100%' }}>
                    <h2 className="page-header">Carte des incidents</h2>
                    <div className="max-w-sm h-96" style={{ width: '70vh'}}>
                        <MapContainer
                            center={[49.4402, 1.0931]}
                            zoom={13}
                            style={{height: '100%', width: '100%', position: 'relative', zIndex:'1'}}
                            whenCreated={(map) => {
                                map.on("locationfound", handleLocationFound);
                            }}
                        >
                            <LocateControl/>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                            />
                            <LocationMarker/>
                            {Array.isArray(incidents) && incidents.length > 0 ? (
                                incidents.map((incident) => {
                                    const { latitude, longitude, incidentTypeId, city } = incident;
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
                                                        <Button onClick={() => setIsSuperHeroListModalOpen(incident.id)}>Afficher la liste</Button>
                                                        {isSuperHeroListModalOpen === incident.id && (
                                                            <SuperHeroesList
                                                                className="modal-component"
                                                                selectedIncidentType={incidentType}
                                                                incidentLatitude={latitude}
                                                                incidentLongitude={longitude}
                                                                superheroesData={superheroesData}
                                                                onCloseModal={() => setIsSuperHeroListModalOpen(null)}
                                                            />
                                                        )}
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
                </Card>
            </div>
            <div style={{marginLeft: '1rem'}}>
                <Card>
                    <SuperHeroList />
                    <SuperHeroRegistration
                        markerPosition={createIncidentPosition}
                        incidentTypes={incidentTypes}
                    />
                </Card>
            </div>
        </div>
    );
};


export default Map;
