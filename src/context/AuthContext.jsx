import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [currentPlace, setCurrentPlace] = useState();
    const [geo, setGeo] = useState();
    const [loader, setLoader] = useState(false);
    const [stores, setStores] = useState();
    const [dist, setDist] = useState()
    const [cartItem, setCartItems] = useState([])
    const [currentStore, setCurrentStore] = useState();
    const [itemTotal, setItemTotal] = useState()

    // get all stores  

    const getStores = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/get-stores`);
            setStores(data.stores);
        } catch (error) {
            console.log(error)
        }
    }

    // reverse geocoding

    const getPlace = async (location) => {
        try {
            const res = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location[1]},${location[0]}.json?access_token=${import.meta.env.VITE_MAPBOX_KEY}`);
            const address = `${res.data.features[0].place_name}`
            setCurrentPlace(address)
            // console.log(res);
        } catch (error) {
            console.log(error)
        }
    }


    // get live location

    const getLocation = () => {
        setLoader(true);
        navigator.geolocation.getCurrentPosition((position) => {
            getPlace([position.coords.latitude, position.coords.longitude])
            setLoader(false)
        },
            (error) => {
                console.log(error);
                setLoader(false)
            },
            { enableHighAccuracy: true });
    }

    // get distance from coordinates -----------

    const fetchDistance = async (store_lat, store_long) => {
        try {
            const response = await axios.get(
                `https://api.mapbox.com/directions/v5/mapbox/driving/${store_long},${store_lat};${geo[1]},${geo[0]}?access_token=${import.meta.env.VITE_MAPBOX_KEY}`
            );
            const data = response.data;
            const distance = (data.routes[0].distance) / 1000;
            return distance;
            // You can set the distance in the component state or do any other processing here
        } catch (error) {
            console.error(error);
        }
    };


    // get distance end ------------------------

    // Cart feature start -------------------

    const addToCart = (item) => {
        setCartItems([...cartItem, item])
        totalPrice();
    }
    const clearCart = () => {
        setCartItems([])
        setCurrentStore()
    }
    const addCurrentStore = (store) => {
        setCurrentStore(store)
    }
    const totalPrice = () => {
        var totalPrice = 0;
        for (let index = 0; index < cartItem.length; index++) {
            totalPrice += cartItem[index].price;
        }
        setItemTotal(totalPrice)
    }

    // cart feature end ---------------------

    return (
        <AuthContext.Provider value={{ user, setUser, currentPlace, getPlace, setGeo, geo, getLocation, loader, setLoader, getStores, stores, dist, fetchDistance, addToCart, cartItem, addCurrentStore, currentStore, itemTotal, clearCart }} >
            {children}
        </AuthContext.Provider>
    )
}