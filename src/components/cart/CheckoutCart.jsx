import React, { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import cartIcons from "../../img/cartIcons.png"
import discount from "../../img/discount.png"
import { useParams } from "react-router-dom"
import Payment from './Payment';
import { AuthContext } from '../../context/AuthContext';
import { getExpectedTime } from '../logics/logics';

const CheckoutCart = () => {
    const { checkOutData } = useContext(AuthContext)
    const params = useParams();
    const { itemTotal, tax, distance, totalBill, deliveryFair } = params;
    return (
        <div className='md:mx-8'>
            <div class="flex flex-col -m-4 px-5 ms:px-0">
                <div class="border rounded-lg p-4">
                    <div class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 ml-4 text-green-400" viewBox="0 0 24 24">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                            <circle cx="12" cy="7" r="4" className='bg-green-200'></circle>
                        </svg>
                        <div class="flex-grow sm:pl-8">
                            <h2 class="title-font font-medium text-lg text-gray-900">{checkOutData?.storeData.storeName}</h2>
                            <h3 class="text-gray-500 text-xs">{checkOutData?.storeData.storeAddress}</h3>
                            <p className='text-xs text-gray-500'><span className='font-semibold'>{distance}KM</span> far from you. <span className='font-bold text-gray-700'>Deliver in {getExpectedTime(distance)} MINS</span></p>
                        </div>
                    </div>
                    <div className='w-full border-b-2 border-dashed border-gray-200 mt-5'></div>
                    <div className='overflow-y-scroll h-[240px]'>
                        {
                            checkOutData?.cartData.map((curr) => {
                                return (
                                    <div className='flex justify-between items-center px-4 mt-4'>
                                        <div className='flex items-center space-x-4'>
                                            <img src={cartIcons} alt="" className='flex-shrink-0 rounded-full h-8 w-8 object-center sm:mb-0 mb-4' />
                                            <div>
                                                <p className='text-sm '>{curr.name}</p>
                                                <small>₹{curr.price + "/" + curr.unitPerPrice + " " + curr.unit}</small>
                                            </div>
                                        </div>
                                        <div className='flex items-center space-x-8'>
                                            <div className='flex items-center space-x-2 border px-2 py-1 bg-green-500 text-white rounded-lg'>
                                                <p className='text-sm'>Qty - {curr.quantity}</p>
                                            </div>
                                            <p className='text-sm'>₹{curr.actualPrice}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {/* Coupon */}
            <div className='flex items-center justify-center space-x-6 border-2 px-4 py-3 mt-14 mb-10 border-dashed'>
                <img src={discount} className='w-6 h-6' alt="" />
                <p>Apply Coupon</p>
            </div>

            {/* Bills */}
            <div className='text-sm'>
                <h4 className='text-light'>Bill Details</h4>
                <p className='flex items-center justify-between'>
                    <span>Item Total</span>
                    <span>₹{itemTotal}</span>
                </p>
                <p className='flex items-center justify-between mb-3'>
                    <span>Delivery Fee |  kms</span>
                    <span>₹{deliveryFair}</span>
                </p>
                <div className='border-b-2 bg-gray-400'></div>
                <p className='flex items-center justify-between mt-3'>
                    <span>Govt Taxes & Other Charges</span>
                    <span>₹{tax}</span>
                </p>
                <div className='border-b-2 border-gray-300 md:border-gray-500 mt-4'></div>
                <p className="flex items-center justify-between mt-3 w-full py-1 text-lg font-semibold">
                    <span>To Pay</span>
                    <span>₹{totalBill}</span>
                </p>
            </div>
            <div className='md:hidden border-b-2 border-gray-300 mt-2 mb-3'></div>

            {/* below medium screen payment option */}
            <div className="md:hidden">
                <Payment />
            </div>
        </div>
    )
}

export default CheckoutCart
