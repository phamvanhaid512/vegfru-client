import React, { useContext, useState } from 'react'
import oip from "../../img/OIP.jpeg"
import { ToastContainer, toast } from 'react-toastify';
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import axios from "axios"
import PropagateLoader from "react-spinners/PropagateLoader"
import { AuthContext } from '../../context/AuthContext';

const override = {
    display: "block",
    marginBottom: "12px",
};

const endpoint = import.meta.env.VITE_API_URL;
const mapbox_url = `https://api.mapbox.com/styles/v1/${import.meta.env.VITE_MAPBOX_USERNAME}/clgjqyhee007o01qt6l1veo00/tiles/256/{z}/{x}/{y}@2x?access_token=${import.meta.env.VITE_MAPBOX_KEY}`


const AddAddress = ({ fetchAddress }) => {
    const { currentPlace, getPlace } = useContext(AuthContext);
    const [position, setPosition] = useState([24.79039723056424, 78.53669117764389]);
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState();
    const [landmark, setLandMark] = useState();
    const [type, setType] = useState();
    const [loader, setLoader] = useState(false);


    // get current location geo coordinates

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation([position.coords.latitude, position.coords.longitude]);
        },
            (error) => {
                console.log(error);
            },
            { enableHighAccuracy: true });
    }

    // fly to current location in map

    const MyLocation = () => {
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

    // submit form

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("jwt"))
                },
            };

            const newAddress = {
                place: currentPlace,
                long: location[1],
                lat: location[0],
                address: address,
                landmark: landmark,
                type: type
            }

            console.log(newAddress);

            const { data } = await axios.post(`${endpoint}/api/user/add-address`, newAddress, config);

            toast.success(data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setAddress("")
            setCurrentLoc("")
            setLandMark("")
            setLoader(false);
            fetchAddress()

        } catch (error) {
            console.log(error)
            setLoader(false);
        }
    }


    return (
        <div>
            <ToastContainer />
            <div className='flex flex-col space-y-14 md:pl-10 md:pr-48'>
                <div className='flex justify-between items-center mt-16'>
                    <div>
                        <h3 className='text-4xl font-semibold mb-2'>Add <span className='text-green-500'> Address</span></h3>
                        <div class="border-b-2 border-black mt-4 w-8"></div>
                    </div>
                    <img src={oip} className='h-16 w-16' />
                </div>
                {/* Map */}
                <div>
                    <MapContainer center={position} zoom={13} style={{ height: '200px' }}>
                        <MyLocation />
                        <TileLayer
                            url={mapbox_url}
                            attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
                        />
                    </MapContainer>
                    <a onClick={getLocation} className="cursor-pointer border-2 border-gray-200 text-sm px-4 py-2">Know your location</a>
                </div>
                {/* Form */}
                <div className="">
                    <form action="#" method="POST" className="space-y-6">
                        <div className=''>

                            <div className="border-r border-l border-t border-b">
                                <p htmlFor="email" className="px-4 pt-4 block text-xs font-medium text-gray-400">
                                    Current location
                                </p>
                                <input
                                    value={currentPlace}
                                    id="text"
                                    name="text"
                                    type="text"
                                    placeholder=''
                                    className="block w-full appearance-none outline-none px-4 py-4 placeholder-gray-400 shadow-sm sm:text-sm"
                                />
                            </div>
                            <div className="border-r border-l border-t border-b">
                                <p htmlFor="email" className="px-4 pt-4 block text-xs font-medium text-gray-400">
                                    Address type
                                </p>
                                <input
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    id="text"
                                    name="text"
                                    type="text"
                                    placeholder='eg. Home/Office'
                                    className="block w-full appearance-none outline-none px-4 py-4 placeholder-gray-300 placeholder:text-sm shadow-sm sm:text-sm"
                                />
                            </div>
                            <div className="border-r border-l border-t border-b">
                                <p htmlFor="email" className="px-4 pt-4 block text-xs font-medium text-gray-400">
                                    Enter complete address
                                </p>
                                <input
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    id="text"
                                    name="text"
                                    type="text"
                                    placeholder='eg. 2nd floor, house no, kolkata'
                                    className="block w-full appearance-none outline-none px-4 py-4 placeholder-gray-300 shadow-sm sm:text-sm"
                                />
                            </div>
                            <div className="border-r border-l border-b">
                                <p htmlFor="email" className="px-4 pt-4 block text-xs font-medium text-gray-400">
                                    Landmark
                                </p>
                                <input
                                    value={landmark}
                                    onChange={(e) => setLandMark(e.target.value)}
                                    id="text"
                                    name="text"
                                    type="text"
                                    placeholder=''
                                    className="block w-full appearance-none outline-none  px-4 py-4 placeholder-gray-400 shadow-sm sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="mt-4 flex w-full justify-center border-transparent bg-green-500 py-4 px-4 text-sm font-medium text-white shadow-sm "
                            >
                                {loader ? <PropagateLoader color="#ffffff" cssOverride={override} size={13} /> : "Save Address"}
                            </button>
                            <p className='text-xs mt-2 text-[#686b78] font-normal'>By clicking on Save Address , you can change <span className='text-black'>your address.</span></p>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default AddAddress
