import React, { useContext, useEffect, useState } from 'react'
import "leaflet/dist/leaflet.css"
import { Icon, divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline, CircleMarker } from "react-leaflet"
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import MapPopup from './MapPopup';
import { AuthContext } from '../../context/AuthContext';


const mapbox_url = `https://api.mapbox.com/styles/v1/${import.meta.env.VITE_MAPBOX_USERNAME}/clgjqyhee007o01qt6l1veo00/tiles/256/{z}/{x}/{y}@2x?access_token=${import.meta.env.VITE_MAPBOX_KEY}`


const marker = [
    {
        geoCode: [22.50598171838847, 88.39993838929564],
        popup: "Hello I am Popup",
        showPopup: true
    },
    {
        geoCode: [22.500260845341288, 88.40701538141923],
        popup: "Hello I am Popup",
        showPopup: false
    },
    {
        geoCode: [22.494676804412663, 88.40449783000565],
        popup: "Hello I am Popup"
    },
    {
        geoCode: [22.503275937260312, 88.40907714812835],
        popup: "Hello I am Popup"
    },
    {
        geoCode: [22.50830657964275, 88.41246333594893],
        popup: "Hello I am Popup"
    }
    ,
    {
        geoCode: [22.50141691862349, 88.39973855451547],
        popup: "Hello I am Popup"
    }
    ,
    {
        geoCode: [22.511536495482233, 88.3995689185848],
        popup: "Hello I am Popup"
    }
    ,
    {
        geoCode: [22.500243639063996, 88.39396351447618],
        popup: "Hello I am Popup"
    }
    ,
    {
        geoCode: [22.515779711570673, 88.38127366007058],
        popup: "Hello I am Popup"
    }
    ,
    {
        geoCode: [22.52769442422921, 88.38255035017141],
        popup: "Hello I am Popup"
    }
    ,
    {
        geoCode: [22.57837395532539, 88.35691346165356],
        popup: "Hello I am Popup"
    }
    ,
    {
        geoCode: [22.584767783792344, 88.33224058017362],
        popup: "Hello I am Popup"
    }
    ,
    {
        geoCode: [22.58077009487836, 88.31492864427429],
        popup: "Hello I am Popup"
    }
    ,
    {
        geoCode: [28.6600, 77.2300],
        popup: "Hello I am Popup"
    }
    ,
    {
        geoCode: [23.6600, 80.2300],
        popup: "Hello I am Popup"
    }
    ,
    {
        geoCode: [28.6100, 77.2800],
        popup: "Hello I am Popup"
    }
    ,
    {
        geoCode: [23.6600, 80.2300],
        popup: "Hello I am Popup"
    }
    ,
    {
        geoCode: [23.4600, 80.3300],
        popup: "Hello I am Popup"
    }
    ,
    {
        geoCode: [23.5600, 80.1300],
        popup: "Hello I am Popup"
    }
];


const MapBox = () => {
    const { geo, setGeo, getPlace } = useContext(AuthContext);
    const [position, setPosition] = useState([0, 0]);
    const [location, setLocation] = useState(null);

    const customIcon = new Icon({
        iconUrl: "https://res.cloudinary.com/amritrajmaurya/image/upload/v1681850742/vegetables_pjh2oq.png",
        iconSize: [48, 48]
    })


    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation([position.coords.latitude, position.coords.longitude]);
            setGeo([position.coords.latitude, position.coords.longitude])
        },
        (error) => {
            console.log(error);
        },
        { enableHighAccuracy: true });
    }, []);

    function MyLocation() {
        const map = useMap();
        if (location) {
            map.flyTo(location, 15);
            getPlace(location)
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
        <div className='mt-[95px]'>
            <MapContainer center={geo ? geo : position} zoom={13} style={{ height: '82vh' }}>
                <MyLocation />
                <TileLayer
                    url={mapbox_url}
                    attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
                />
                <MarkerClusterGroup chunkedLoading >
                    {
                        marker.map((mark, index) => {
                            return (
                                <Marker key={index} position={mark.geoCode} icon={customIcon} >
                                    <Popup><MapPopup /></Popup>
                                </Marker>
                            )
                        })
                    }
                </MarkerClusterGroup>
            </MapContainer>
            <p className='text-center text-[14px] mt-4 text-gray-600 px-20'> Copyright &copy; VegFru 2023 | Design & Developed by <a className='font-medium underline' href='https://linktr.ee/rajamrit'>Amrit Raj</a> </p>
        </div>
    )
}

export default MapBox