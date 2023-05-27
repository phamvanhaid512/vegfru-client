import React, { useState, useEffect } from 'react'
import DeliveryDetails from '../components/order/DeliveryDetails'
import OrderSummary from '../components/order/OrderSummary'
import HomeNav from '../components/navs/HomeNav'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import HashLoader from "react-spinners/HashLoader"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button
} from '@chakra-ui/react'
import Ratings from '../components/order/Ratings'


const Orderdetail = () => {

    const params = useParams();
    const _id = params.orderId
    const [selectedOrder, setSelectedOrder] = useState()
    const [isLoader, setIsLoader] = useState(false);
    const { onClose } = useDisclosure()
    const [isPopup, setIsPopUp] = useState(false)

    const fetchSingleOrder = async () => {
        setIsLoader(true)
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("jwt"))
                },
            };

            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/order/customer/get-order/${_id}`, config);
            console.log(data)
            if (data.orderData.orderStatus === "Delivered"){
                setIsPopUp(true)
            }
            setSelectedOrder(data.orderData)
        } catch (error) {
            console.log(error)
        }
        setIsLoader(false)
    }

    useEffect(() => {
        fetchSingleOrder()
    }, [])

    return (
        <div>
            <HomeNav />
            <Modal blockScrollOnMount={false} isOpen={isPopup} onClose={() => setIsPopUp(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className='text-green-500' >Your Order is Delivered! </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Ratings setIsPopUp={setIsPopUp} storeId={selectedOrder?.storeId._id} />
                    </ModalBody>
                </ModalContent>
            </Modal>
            {
                isLoader ? (
                    <div className='flex justify-center mt-[400px]'>
                        <HashLoader color="#36d7b7" />
                    </div>
                ) : (

                    <div className="w-full mt-[100px] p-4 md:px-16 border rounded-lg bg-white min-h-screen">
                        <div className="flex sm:flex-row flex-col-reverse  justify-evenly">
                            <div className="sm:w-1/3  sm:border-r-2 flex flex-col">
                                <DeliveryDetails selectedOrder={selectedOrder} />
                            </div>
                            <div className="sm:w-2/3">
                                <OrderSummary selectedOrder={selectedOrder} />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Orderdetail
