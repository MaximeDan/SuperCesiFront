import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import '../Styles/HomePage.css';
import L, { Icon } from 'leaflet';
import './CreateIncidentModal';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

// Import marker icons for different incident types
import fireIcon from '../icons/fire-truck.png';
import carAccidentIcon from '../icons/car-accident.png';
import boatAccidentIcon from '../icons/sinking.png';
import planeAccidentIcon from '../icons/airplane.png';
import floodIcon from '../icons/flood.png';
import gasLeakIcon from '../icons/gas.png';
import landSlideIcon from '../icons/landslide.png';
import robberyIcon from '../icons/robbery.png';
import snakesInvasionIcon from '../icons/snakes.png';
import prisonerEscapeIcon from '../icons/wall.png';
import strikeIcon from '../icons/activist.png';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';

const HomePage = () => {
    const [map, setMap] = useState(null);
    const [incidents, setIncidents] = useState([]);
    const [createIncidentPosition, setCreateIncidentPosition] = useState(null);
    const [createIncidentMode, setCreateIncidentMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [markerPosition, setMarkerPosition] = useState(null);

    const handleButtonClick = () => {
        setCreateIncidentMode(true);
    };

    const handleMapClick = (e) => {
        if (createIncidentMode) {
            setCreateIncidentPosition(e.latlng);
            setIsModalOpen(true);
            L.marker(e.latlng).addTo(map);
        }
    };

    const iconMappings = {
        Fire: L.icon({
                         iconUrl: fireIcon,
                         iconSize: [32, 32],
                     }),
        CarAccident: L.icon({
                                iconUrl: carAccidentIcon,
                                iconSize: [32, 32],
                            }),
        Flood: L.icon({
                          iconUrl: floodIcon,
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


    function LocationMarker() {
        const map = useMapEvents({
                                     click(e) {
                                         setCreateIncidentPosition(e.latlng);
                                     },
                                     locationfound(e) {
                                         setCreateIncidentPosition(e.latlng)
                                         map.flyTo(e.latlng, map.getZoom())
                                         geocodeLatLng(e.latlng);
                                     },
                                 });
        const geocodeLatLng = async (latlng) => {
            const geocoder = new L.Control.Geocoder.Nominatim();
            const results = await geocoder.reverse(latlng, map.options.crs.scale(map.getZoom()));

            if (results.length > 0) {
                const city = results[0].name;
                onLocationSelect(city);
            }
        };


        return createIncidentPosition === null ? null : (
            <Marker position={createIncidentPosition} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                <Popup>You are here</Popup>
            </Marker>
        )
    }

    useEffect(() => {
        // Call the API to fetch the incidents
        // ...

        // Mock data for demonstration
        const mockIncidents = [
            { id: 1, type: 'Fire', lat: 49.4503, lng: 1.1021 },
            { id: 2, type: 'CarAccident', lat: 49.4583, lng: 1.0914 },
            { id: 2, type: 'SnakeInvasion', lat: 49.4503, lng: 1.0914 },
            // Add more mock incidents
        ];
        setIncidents(mockIncidents);
    }, []);

    useEffect(() => {
        if (map && createIncidentPosition) {
            L.marker(createIncidentPosition).addTo(map);
        }
    }, [map, createIncidentPosition]);

    return (
        <div>
            <h2 className="page-header">Dashboard</h2>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        <div style={{ height: '400px' }}>
                            <MapContainer
                                center={[49.4402, 1.0931]}
                                zoom={13}
                                style={{ height: '100%' }}
                                whenCreated={setMap}
                                onClick={handleMapClick}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                                />
                                <LocationMarker /> {/* Add this line */}
                                {incidents.map((incident) => (
                                    <Marker
                                        key={incident.id}
                                        position={[incident.lat, incident.lng]}
                                        icon={iconMappings[incident.type]}
                                    >
                                        <Popup>
                                            <h2>Marker Popup</h2>
                                            <p>This is a popup content.</p>
                                            <button onClick={handleButtonClick}>Click me</button>
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    {/* Display your incident creation form or component here */}
                    <div className="incident-form">
                        {createIncidentMode ? (
                            <>
                                <h3>Create Incident</h3>
                                <p>Click on the map to select the incident location.</p>
                                <div>Location: {createIncidentPosition ? `${createIncidentPosition.lat}, ${createIncidentPosition.lng}` : ''}</div>                            </>
                        ) : (
                            <button onClick={handleButtonClick}>Create Incident</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default HomePage;
