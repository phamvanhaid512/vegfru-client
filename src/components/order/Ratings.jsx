import React, { useState } from 'react'
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"

const Ratings = ({ setIsPopUp, storeId }) => {
    const [review, setReview] = useState();
    const [radio, setRadio] = useState();

    const handleSubmit = async () => {
        try {
            const reqData = {
                review, radio, storeId
            }
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("jwt"))
                },
            };
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/store/rate`, reqData, config);
            // console.log(data)
            toast.success("Thank you for rating!", {
                autoClose : 2000,
                hideProgressBar : true,
                theme : "colored",
                position : "top-center"
            })
            setTimeout(() => {
                setIsPopUp(false);
            }, 2000);


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <ToastContainer />
            <div class="bg-white flex flex-col w-full">
                <h2 class="text-gray-900 text-lg mb-1 font-bold title-font">Ratings & Reviews</h2>
                <p class="leading-relaxed mb-5 text-gray-600">Share Your Experience: Rate and Review Vegetable and Fruits Marketplace(VegFru).</p>
                <div class="relative mb-4">
                    <label for="message" class="leading-7 text-sm text-gray-600">Review this store</label>
                    <textarea value={review} onChange={(e) => setReview(e.target.value)} id="message" placeholder='Description' name="message" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
                <div className="relative mb-4">
                    <label className="leading-7 text-sm text-gray-600">Would you recommend this store?</label>
                    <div>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="recommendation"
                                value="yes"
                                onChange={(e) => setRadio(e.target.value)}
                                checked={radio === 'yes'}
                                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                            />
                            <span className="ml-2">Yes</span>
                        </label>
                        <label className="inline-flex items-center ml-6">
                            <input
                                type="radio"
                                name="recommendation"
                                value="no"
                                checked={radio == "no"}
                                onChange={(e) => setRadio(e.target.value)}
                                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                            />
                            <span className="ml-2">No</span>
                        </label>
                    </div>
                </div>
                <button class="text-white mb-4 bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg" onClick={handleSubmit} >Submit</button>
            </div>
        </div>
    )
}

export default Ratings
