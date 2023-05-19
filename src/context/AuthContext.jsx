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
    const [itemTotal, setItemTotal] = useState(0)

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

    const addToCart = (data) => {
        // checking if item is already in cart or not
        const index = cartItem.findIndex(item => item.id === data.id)

        if (index != -1) {
            // console.log("Present")          
            // increaase the quantity and price
            cartItem[index].quantity = cartItem[index].quantity + data.quantity
            cartItem[index].actualPrice = cartItem[index].actualPrice + data.actualPrice
        } else {
            setCartItems([...cartItem, data])
        }
        setItemTotal(itemTotal + data.actualPrice)
    }
    const clearCart = () => {
        setCartItems([])
        setCurrentStore()
        setItemTotal(0)
    }
    const addCurrentStore = (store) => {
        setCurrentStore(store)
    }
    const decreseQuantity = (data) => {
        const index = cartItem.findIndex(item => item.id === data.id)
        if(cartItem[index].quantity === 0) return;
        cartItem[index].quantity = cartItem[index].quantity - 1;
        cartItem[index].actualPrice = cartItem[index].actualPrice - data.price;
        setItemTotal(itemTotal - data.price);
        if(cartItem[index].quantity === 0){
            const newArray = cartItem.filter(item => item.id !== index);
            setCartItems(newArray)
        }
    }
    const increaseQuantity = (data) => {
        const index = cartItem.findIndex(item => item.id === data.id)
        cartItem[index].quantity = cartItem[index].quantity + 1;
        cartItem[index].actualPrice = cartItem[index].actualPrice + data.price;
        setItemTotal(itemTotal + data.price);
    }

    // cart feature end ---------------------

    return (
        <AuthContext.Provider value={{ user, setUser, currentPlace, getPlace, setGeo, geo, getLocation, loader, setLoader, getStores, stores, dist, fetchDistance, addToCart, cartItem, addCurrentStore, currentStore, itemTotal, clearCart, decreseQuantity,increaseQuantity }} >
            {children}
        </AuthContext.Provider>
    )
}