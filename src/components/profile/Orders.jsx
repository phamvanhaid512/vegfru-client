import React from 'react'
import { useNavigate } from 'react-router-dom'
import moment from "moment";
import { getStatus } from "../logics/logics"
import { Badge } from '@chakra-ui/react'

const Orders = ({orderList}) => {
    const navigate = useNavigate()


    const handleNavigate = (curr) => {
        navigate(`/route/order-details/${curr._id}`)
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
                                            <a class="font-light text-xs inline-flex items-center">{moment(curr.orderDate).utc().fromNow() == "a day ago"
                                                ? "yesterday"
                                                : moment(curr.orderDate).utc().fromNow()}
                                            </a>
                                        </div>
                                        <small>{curr.storeId.storeAddress}</small>
                                        <p class="leading-relaxed text-base">
                                            <div class="mt-1 flex items-center justify-between">
                                                <small className='font-semibold'>{curr.itemsOrdered.length} Item(s)</small>
                                                <p>₹{curr.billDetails.totalBill}</p>
                                            </div>
                                        </p>
                                        <Badge colorScheme={getStatus(curr.orderStatus)}>{curr.orderStatus}
                                        </Badge>

                                    </div>
                                </div>
                            </div>
                        </section>
                    )
                }).reverse() : <p>No orders you have!</p>
            }

        </>
    )
}

export default Orders
