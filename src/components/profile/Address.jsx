import React, { useEffect, useState } from 'react'
import EditAddress from "./EditAddress"
import {
    Drawer,
    DrawerBody,
    useDisclosure,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';


// ENDPOINT
const endpoint = "http://localhost:8000";

const Address = ({ address, fetchAddress }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [singleAddress, setSingleAddress] = useState();

    const handleClick = (address) => {
        onOpen()
        setSingleAddress(address)
    }

    const handleDelete = async (id) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("jwt"))
                },
            };

            const { data } = await axios.delete(
                `${endpoint}/api/user/delete-address/${id}`,
                config
            );

            toast.success(data.message, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            // Fetch the updated address after successful deletion
            fetchAddress();
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div>
            <ToastContainer />
            <section class="text-gray-600 body-font">
                <div class="container px-5 flex flex-wrap">
                    {address?.length > 0 && <p className='text-md'>Manage Addresses</p>}
                    <div class="flex flex-col -m-4">
                        {
                            address?.length > 0 ? address.map((curr) => {
                                return (
                                    <div class="px-4 mt-3 pt-4" key={curr._id}>
                                        <div class="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                                            <div class="w-16 h-16 sm:mr-8 ml-20 md:ml-0 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 flex-shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                                </svg>

                                            </div>
                                            <div class="flex-grow">
                                                <h2 class="text-gray-800 text-lg title-font font-semibold text-md mb-3">{curr.type}</h2>
                                                <p class="leading-relaxed text-base">{curr.address + " " + curr.place}</p>
                                                <small>Landmark : {curr.landmark}</small>
                                                <div className='space-x-3'>
                                                    <a onClick={() => handleClick(curr)} class="cursor-pointer mt-3 text-green-500 border border-green-500 px-4 py-1 text-sm inline-flex items-center">Edit
                                                    </a>
                                                    <a onClick={() => handleDelete(curr._id)} class="mt-3 text-white bg-green-500 cursor-pointer px-2 py-1 text-sm inline-flex items-center">Delete
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <p>No any address added!</p>
                        }

                    </div>
                </div>
            </section>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="lg" >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <EditAddress singleAddress={singleAddress} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default Address
