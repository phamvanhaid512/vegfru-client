import React, { useContext, useEffect } from 'react'
import Payment from './Payment'
import { AuthContext } from '../../context/AuthContext'


const Delivery = () => {
    const { yourAddress, fetchAddress } = useContext(AuthContext)
    useEffect(() => {
        fetchAddress()
    }, [])
    return (
        <div>
            <section class="text-gray-600 body-font">
                <h2 className='text-xl font-semibold '>Choose a delivery address</h2>
                <p className='text-sm mb-4'>Multiple addresses in this location</p>
                <div className='space-y-2 mb-8'>
                    {
                        yourAddress?.map((curr) => {
                            return (
                                <div class="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-4 sm:flex-row flex-col">
                                    <div class="w-16 h-16 sm:mr-8 ml-20 md:ml-0 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>

                                    </div>
                                    <div class="flex-grow">
                                        <h2 class="text-gray-800 text-md title-font font-semibold text-md mb-3">{curr.type}</h2>
                                        <p class="leading-relaxed text-xs">{curr.address + " " + curr.place}</p>
                                        <small>Landmark : {curr.landmark}</small>
                                        <div className=''>
                                            <a class="mt-3 cursor-pointer text-white bg-green-500 px-2 py-1 text-sm inline-flex items-center">Deliver here
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="hidden md:block">
                    <Payment />
                </div>
            </section>
        </div>
    )
}

export default Delivery
