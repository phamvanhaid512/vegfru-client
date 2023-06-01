import React, { useContext, useEffect, useState } from 'react'
import {
    List,
    ListItem,
    Badge,
    Modal,
    ModalOverlay,
    ModalContent,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Image
} from '@chakra-ui/react'
import { AuthContext } from "../../context/AuthContext"
import { AiFillStar } from "react-icons/ai"
import { getExpectedTime } from '../logics/logics'
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useNavigate } from 'react-router-dom'
import emptyStore from "../../img/grocery-store.png"
import moment from "moment"

const VendorDetailComponent = ({ singleStore }) => {
    const [dist, setDistance] = useState()
    const { fetchDistance } = useContext(AuthContext)
    const navigate = useNavigate()

    // console.log(singleStore?.comments)

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
            <Modal size="xl" isOpen={dist > 10 ? true : false} >
                <ModalOverlay />
                <ModalContent>
                    <Alert
                        status='info'
                        variant='subtle'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                        textAlign='center'
                        height='300px'
                    >
                        <AlertIcon boxSize='40px' mr={0} />
                        <AlertTitle mt={4} mb={1} fontSize='lg'>
                            Sorry can't delivery to your location.
                        </AlertTitle>
                        <AlertDescription maxWidth='sm'>
                            <div>
                                The store is far from your location, try buying from another stores.
                            </div>
                            <div onClick={() => navigate("/dashboard")} className='cursor-pointer flex bg-black text-sm text-white w-24 space-x-1 items-center px-3 py-2 rounded-md mx-auto mt-3'>
                                <AiOutlineArrowLeft /> <span>Go Back</span>
                            </div>
                        </AlertDescription>
                    </Alert>
                </ModalContent>
            </Modal>
            <div class="py-24 mt-12 px-10 md:px-0 flex flex-col md:overflow-y-scroll md:h-screen md:scrollbar-hide ">
                <div class="lg:w-4/6 mx-auto">
                    <div class="flex flex-col sm:flex-col md:mt-10 ">
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full inline-flex items-center justify-center bg-green-200 text-green-400">
                                <img src={emptyStore} />
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

                                            Like - <span className='text-red-600 font-semibold ml-1'>{singleStore?.like.length}</span>, &nbsp; Rating - &nbsp; <span className='flex items-center space-x-1 font-semibold text-green-500'>4.5/<span className='text-gray-600'>5.0</span> <AiFillStar /></span>
                                        </ListItem>
                                        <ListItem className='flex'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-green-500 mr-1">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                            </svg>

                                            Total successful orders - <span className='text-gray-600 font-semibold ml-1'>23</span>
                                        </ListItem>
                                        <ListItem className='flex'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-green-500 mr-1">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                            </svg>

                                            <Badge>Status - <span className={`${singleStore?.status === "Active" ? "text-green-600" : "text-red-600"} font-semibold text-md ml-1`}>{singleStore?.status === "Active" ? "Open" : singleStore?.status}</span></Badge>
                                        </ListItem>
                                    </List>
                                </div>
                                {
                                    singleStore?.comments.length !== 0 && (
                                        <div className='md:block hidden mt-5 text-sm px-2 font-semibold'>
                                            <h2 className='mb-3'>Reviews & Ratings</h2>
                                            <div className=''>
                                                {
                                                    singleStore?.comments.map((review) => {
                                                        return (
                                                            <span class="flex space-x-2 mb-3 pl-4 py-2 border-b">
                                                                <span className='rounded-md flex text-green-500 '>4.5 <AiFillStar /></span>
                                                                <div className='flex flex-col'>
                                                                    <div className='flex space-x-1'>
                                                                        <span class="font-medium text-gray-900">{review.clientId.name}</span>
                                                                        <span class="text-[11px] font-medium text-gray-400">{moment(review.time).utc().fromNow() == "a day ago"
                                                                            ? "yesterday"
                                                                            : moment(review.time).utc().fromNow()}</span>
                                                                    </div>
                                                                    <span class="text-gray-600 text-xs">{review.comment}</span>
                                                                </div>
                                                            </span>
                                                        )
                                                    }).reverse()
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VendorDetailComponent
