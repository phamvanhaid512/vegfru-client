import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Orders = () => {
    const { setSelectedOrder } = useContext(AuthContext)
    const navigate = useNavigate()
    const [orderList, setOrderList] = useState()

    const fetchOrder = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("jwt"))
                },
            };

            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/order/customer/get-order`, config);
            // console.log(data)
            setOrderList(data.orderData)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchOrder()
    }, [])

    const handleNavigate = (curr) => {
        navigate(`/order-details/${curr._id}`)
    }

    return (
        <>
            {
                orderList?.length > 0 ? orderList?.map((curr) => {
                    return (
                        <section class="text-gray-600 body-font cursor-pointer" onClick={() => handleNavigate(curr)}>
                            <div class="container px-5 sm:px-1 mx-auto">
                                <div class="flex items-center border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col justify-between">
                                    <div class="sm:w-16 sm:h-16 h-10 w-10 sm:mr-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 flex-shrink-0">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="sm:w-6 sm:h-6 w-6 h-6" viewBox="0 0 24 24">
                                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                        </svg>
                                    </div>
                                    <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                                        <div className='flex items-center justify-between'>
                                            <h2 class="text-gray-900 text-lg title-font font-medium">{curr.storeId.storeName}
                                            </h2>
                                            <a class="font-semibold text-xs inline-flex items-center uppercase">{curr.orderStatus}
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="text-green-500 ml-2 w-5 h-5 ">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>

                                            </a>
                                        </div>
                                        <small>{curr.storeId.storeAddress}</small>
                                        <p class="leading-relaxed text-base">
                                            <div class="mt-1 flex items-center justify-between">
                                                <small className='font-semibold'>{curr.itemsOrdered.length} Item(s)</small>
                                                <p>₹{curr.billDetails.totalBill}</p>
                                            </div>
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </section>
                    )
                }) : <p>No orders you have!</p>
            }

        </>
    )
}

export default Orders
