import React, { useContext, useEffect, useState } from 'react'
import {
    List,
    ListItem,
    ListIcon,
} from '@chakra-ui/react'
import { AuthContext } from "../../context/AuthContext"
import { getExpectedTime } from '../logics/logics'

const VendorDetailComponent = ({ singleStore }) => {
    const [dist, setDistance] = useState()
    const { fetchDistance } = useContext(AuthContext)

    useEffect(() => {
        fetchDistance(singleStore?.lat, singleStore?.long)
            .then(distance => {
                // console.log('Distance:', distance);
                setDistance(distance)
            })
            .catch(error => {
                console.log('Error:', error);
            });
    }, [])

    return (
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mt-12 mx-auto flex flex-col">
                <div class="lg:w-4/6 mx-auto">
                    <div class="flex flex-col sm:flex-col md:mt-10">
                        <div class="text-center">
                            <div class="w-20 h-20 rounded-full inline-flex items-center justify-center bg-green-200 text-green-400">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <div class="flex flex-col items-center text-center justify-center">
                                <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">{singleStore?.storeName}</h2>
                                <div class="w-12 h-1 bg-green-500 rounded mt-2 mb-4"></div>
                                <p class="text-base">{singleStore?.storeAddress}</p>
                            </div>
                        </div>
                        <div class="mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                            <div class="leading-relaxed text-lg mb-4">
                                <div>
                                    <List className='text-sm mt-3' spacing={3}>
                                        <ListItem className='flex'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-5 h-5 text-green-500 mr-1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {singleStore?.storeType === "both" ? "VEGETABLES & FRUITS" : singleStore?.storeType.toUpperCase()}
                                        </ListItem>
                                        <ListItem className='flex'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-green-500 mr-1">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                            </svg>

                                            <strong>{dist?.toFixed(1)}KM&nbsp;</strong> away from you
                                        </ListItem>
                                        <ListItem className='flex'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-green-500 mr-1">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                            </svg>
                                            {dist > 10 ? (<>
                                                <span className='text-red-500 font-semibold'> Not Deliverable</span>
                                            </>) : (
                                                <>
                                                    Expected delivery in <strong>&nbsp;{getExpectedTime(dist)} MIN</strong>
                                                </>
                                            )}
                                        </ListItem>
                                        <ListItem className='flex'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-green-500 mr-1">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                            </svg>

                                            Like - <span className='text-red-600 font-semibold ml-1'>{singleStore?.like.length}</span>, &nbsp; Rating - &nbsp; <span className='font-semibold text-green-500'>4.5/<span className='text-gray-600'>5.0</span></span>
                                        </ListItem>
                                        <ListItem className='flex'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-green-500 mr-1">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                            </svg>

                                            Total Orders - <span className='text-gray-600 font-semibold ml-1'>23</span>
                                        </ListItem>
                                        <ListItem className='flex'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-green-500 mr-1">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                            </svg>

                                            Status - <span className='text-red-600 font-semibold text-md ml-1'>{singleStore?.status}</span>
                                        </ListItem>
                                    </List>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VendorDetailComponent
