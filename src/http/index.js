import axios from "axios";


// *************** API's Start ********************

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
});

// List of all endpoints other than authentication api's

export const login = (data) => api.post("/api/user/login", data);
export const register = (data) => api.post("/api/user/register", data);
export const logout = () => api.get("/api/user/logout");
export const fetchStores = () => api.get("/api/user/get-stores");
export const getAddress = () => api.get("/api/user/get-alladdress");
export const getUser = () => api.get("/api/user");
export const getOrders = () => api.get("/api/order/customer/get-order");
export const getOrderById = (data) => api.get(`/api/order/customer/get-order/${data}`);
export const createPayment = (data) => api.post("/api/stripe/create-checkout-session", data);
export const getStore = (data) => api.get(`/api/user/get-store/${data}`);
export const getProducts = (data) => api.get(`/api/vendor/product/get-product/${data}`)
export const deleteAddress = (data) => api.delete(`/api/user/delete-address/${data}`)
export const addAddress = (data) => api.post(`/api/user/add-address`, data)
export const addRating = (data) => api.post(`/api/user/store/rate`, data);

// *************** API's End ********************




// Incterceptors (req or res ke bich me rehta hai)

api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if(error.response.status === 401 && error.config && !error.config._isRetry){
        originalRequest.isRetry = true;

        try {
            await axios.get(`${import.meta.env.VITE_API_URL}api/user/refresh`, {
                withCredentials : true
            });

            return api.request(originalRequest);

        } catch (error) {
            console.log(error.message);
        }
    }

    throw error;
})
