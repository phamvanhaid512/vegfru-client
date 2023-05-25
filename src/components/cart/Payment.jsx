import React, { useContext, useState } from 'react'
import { AuthContext } from "../../context/AuthContext"
import { useParams } from "react-router-dom"
import axios from "axios"
import { PropagateLoader } from "react-spinners"
import { useNavigate } from 'react-router-dom';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify'

const override = {
    display: "block",
    marginBottom: "12px",
};


function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}


const Payment = () => {
    const [isPayment, setIsPayment] = useState(false);
    const { checkOutData, user, loader, setLoader, deliveryAddress, setDeliveryAddress, fetchOrder } = useContext(AuthContext)
    const params = useParams()
    const { tax, itemTotal, deliveryFair, totalBill } = params;
    const navigate = useNavigate()

    const handleAddOrder = async (body) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("jwt"))
                },
            };
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/order/add-order`,
                body
                , config)
            if (data.success) {
                setIsPayment(true);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handlePayment = async () => {

        if (deliveryAddress === undefined) {
            toast.warning("Choose address!", {
                theme: "colored",
                autoClose: 2000,
                hideProgressBar: true
            })
            return;
        }

        setLoader(true)
        console.log("Payment Clicked!")

        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?')
            return
        }

        const config = {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("jwt"))
            },
        };

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/order/create-order`, {
                items: checkOutData?.cartData.length, bill: totalBill
            }, config);

            if (!res) {
                alert("Something went wrong!")
            }
            const options = {
                "key": 'rzp_test_G3gA5dRpgezWGS', // Enter the Key ID generated from the Dashboard
                "amount": res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": res.data.currency,
                "name": "Vegfru Bill",
                "description": res.data.notes.desc,
                "image": "https://res.cloudinary.com/amritrajmaurya/image/upload/v1681850742/vegetables_pjh2oq.png",
                "order_id": res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": function (response) {

                    // console.log(response)
                    const data = {
                        itemsOrdered: checkOutData?.cartData,
                        storeId: checkOutData?.storeData._id,
                        paymentDetails: {
                            orderId: response.razorpay_order_id,
                            paymentId: response.razorpay_payment_id,
                            signature: response.razorpay_signature
                        },
                        toAddress: deliveryAddress._id,
                        orderDate: new Date(),
                        billDetails: {
                            mrp: itemTotal,
                            tax: tax,
                            deliverFair: deliveryFair,
                            totalBill: totalBill
                        },
                        vendorId: checkOutData?.storeData.vendorId,
                        receipt: res.data.receipt
                    }
                    handleAddOrder(data);
                    setLoader(false);
                },
                "prefill": {
                    "name": user.name,
                    "email": user.email,
                    "contact": user.phone
                },
            };

            var rzp1 = new window.Razorpay(options);

            rzp1.open();

            rzp1.on('payment.failed', function (response) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
        } catch (error) {
            console.log(error);
        }
        setLoader(false);
    }

    const handleNavigate = () => {
        fetchOrder()
        navigate("/route/profile")
        setDeliveryAddress()
    }


    return (
        <div>
            <ToastContainer />
            {/* Modal */}
            <Modal size="xl" isOpen={isPayment}>
                <ModalOverlay />
                <ModalContent>

                    <Alert
                        status='success'
                        variant='subtle'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                        textAlign='center'
                        height='300px'
                    >
                        <AlertIcon boxSize='40px' mr={0} />
                        <AlertTitle mt={4} mb={1} fontSize='lg'>
                            Order Placed!
                        </AlertTitle>
                        <AlertDescription maxWidth='sm'>
                            Thank you for choosing Vegfru.
                            <div onClick={handleNavigate} className='cursor-pointer flex bg-green-700 text-sm text-white w-[100px] space-x-1 items-center px-3 py-2 mx-auto mt-3'>
                                <span>Order detail</span>
                            </div>
                        </AlertDescription>
                    </Alert>

                </ModalContent>
            </Modal>
            {/* Modal */}
            <section class="text-gray-600 body-font">
                <h2 className='text-xl font-semibold '>Choose payment method</h2>
                <div className='flex flex-row md:flex-col space-x-2 md:space-x-0'>
                    <button
                        type="submit"
                        className="mt-3 flex w-full justify-center border-2 border-green-500 py-2  md:py-4 px-4 text-xs md:text-sm font-semibold text-green-500 shadow-sm rounded-lg "
                    >
                        Cash on delivery
                    </button>
                    <button
                        onClick={handlePayment}
                        type="submit"
                        className="mt-3 flex w-full justify-center border-transparent bg-green-500 py-2  md:py-4 px-4 text-xs md:text-sm font-semibold text-white shadow-sm rounded-lg "
                    >
                        {
                            loader ? <PropagateLoader color="#ffffff" cssOverride={override} size={13} /> : "UPI/Netbanking/Credit/Debit-Card"
                        }

                    </button>
                </div>
                <div className='mt-14 md:hidden'></div>
            </section>
        </div>
    )
}

export default Payment
