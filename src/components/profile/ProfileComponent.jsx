import React, { useState, useEffect, useContext } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Orders from './Orders'
import {
    Drawer,
    DrawerBody,
    useDisclosure,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import Address from './Address'
import EditProfile from './EditProfile'
import AddAddress from './AddAddress'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { Badge } from '@chakra-ui/react'
import { doLogout } from '../logics/logics'


const ProfileComponent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [fun, setFun] = useState()
    const navigate = useNavigate();
    const { user, currentPlace, setUser, totalOrder, orderList } = useContext(AuthContext)

    const handleClick = (drawer) => {
        setFun(drawer);
        onOpen()
    }

    const logout = () => {
        if (doLogout()){
            setUser();
            <Navigate to={"/"} />
        }

    }

    return (
        <div>
            {/* Top */}
            <section class="text-gray-600 body-font">
                <div class="container px-5 py-24 mx-auto flex flex-col">
                    <div class="lg:w-4/6 mx-auto">
                        <div class="flex flex-col sm:flex-row mt-10">
                            <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                                <div class="w-20 h-20 rounded-full inline-flex items-center justify-center bg-green-100 text-green-400">
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24">
                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                                <div class="flex flex-col items-center text-center justify-center">
                                    <h2 class="flex font-medium title-font mt-4 text-gray-900 text-lg">{user?.name}
                                        <svg onClick={logout} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="ml-2 cursor-pointer w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                        </svg>

                                    </h2>
                                    <span onClick={() => handleClick("prof")} className='text-sm underline cursor-pointer'>Edit Profile</span>
                                    <div class="w-12 h-1 bg-green-500 rounded mt-2 mb-4"></div>
                                    <div>
                                        {
                                            currentPlace
                                        }
                                    </div>
                                    <Badge className='mt-3'>Total Orders : <span className='font-semibold'>{totalOrder ? totalOrder : 0}</span></Badge>
                                </div>
                                <div>
                                    <a onClick={() => handleClick("add")} class="mt-3 cursor-pointer text-white bg-green-500 px-2 py-1 text-sm inline-flex items-center">Add Address
                                    </a>
                                </div>
                            </div>
                            <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                                <Tabs isFitted variant='enclosed'>
                                    <TabList mb='1em'>
                                        <Tab>Orders</Tab>
                                        <Tab>Addresses</Tab>
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel>
                                            <Orders orderList={orderList} />
                                        </TabPanel>
                                        <TabPanel>
                                            <Address />
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Drawer onClose={onClose} isOpen={isOpen} size="lg" >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody>
                        {fun === "add" ? <AddAddress /> : <EditProfile />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    )
}
// Tabs ka user krenge jaise scribeFi me kiye the otie?


export default ProfileComponent
