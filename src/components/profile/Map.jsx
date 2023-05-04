import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import axios from "axios"

const mapbox_url = `https://api.mapbox.com/styles/v1/${import.meta.env.VITE_MAPBOX_USERNAME}/clgjqyhee007o01qt6l1veo00/tiles/256/{z}/{x}/{y}@2x?access_token=${import.meta.env.VITE_MAPBOX_KEY}`

const Map = ({ setLocation, setCurrentLoc }) => {

    const [position, setPosition] = useState([24.79039723056424, 78.53669117764389]);

    const getAddress = async (location) => {
        try {
            const res = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location[1]},${location[0]}.json?access_token=${import.meta.env.VITE_MAPBOX_KEY}`);
            const address = `${res.data.features[0].place_name}`
            setCurrentLoc(address)
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation([position.coords.latitude, position.coords.longitude]);
        },
            (error) => {
                console.log(error);
            },
            { enableHighAccuracy: true });
    }

    const MyLocation = () => {
        const map = useMap();
        if (location) {
            map.flyTo(location, 15);
            getAddress(location);
            return (
                <>
                    <Marker position={location} >
                        <Popup>You are here</Popup>
                    </Marker>
                </>
            );;
        }
        return null;
    }
    return (
        <>
            <MapContainer center={position} zoom={13} style={{ height: '200px' }}>
                <MyLocation />
                <TileLayer
                    url={mapbox_url}
                    attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
                />
            </MapContainer>
            <a onClick={getLocation} className="cursor-pointer border-2 border-gray-200 text-sm px-4 py-2">Know your location</a>
        </>
    )
}

export default Map
