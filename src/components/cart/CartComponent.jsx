import React, { useContext, useEffect, useState } from 'react'
import oip from "../../img/OIP.jpeg"
import { ToastContainer, toast } from 'react-toastify';
import cartIcons from "../../img/cartIcons.png"
import discount from "../../img/discount.png"
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';
import emptyCart from "../../img/empty.png"
import { getExpectedTime, getExpectedFair, getTax } from '../logics/logics';


const CartComponent = () => {
    const { cartItem, currentStore, itemTotal, fetchDistance, decreseQuantity, increaseQuantity, moveToCheckout } = useContext(AuthContext)
    const navigate = useNavigate();
    const [dist, setDist] = useState()

    useEffect(() => {
        if (cartItem.length > 0) {
            fetchDistance(currentStore?.lat, currentStore?.long)
                .then(distance => {
                    // console.log('Distance:', distance);
                    setDist(distance)
                })
                .catch(error => {
                    console.log('Error:', error);
                });
        }
    }, [])

    const handleProceed = () => {
        const dataToBePlaced = {
            storeData : currentStore,
            cartData : cartItem
        }
        const tax = getTax(itemTotal)
        const distance = dist.toFixed(1)
        const delieryFair = getExpectedFair(distance)
        const totalBill = itemTotal + tax + delieryFair;
        moveToCheckout(dataToBePlaced)
        navigate(`/checkout/${itemTotal}/${tax}/${distance}/${totalBill}/${delieryFair}`)
    }

    return (
        <div>
            <ToastContainer />
            <div className='flex flex-col space-y-14 px-4'>
                {/* CArt Header */}
                <div className='flex justify-between items-center mt-14'>
                    <div>
                        <h3 className='text-4xl font-semibold mb-2'>Cart</h3>
                        <p className='text-[12px]'>Better health <span className='text-green-500 font-medium  cursor-pointer'> starts with better shopping. Shop our cart today.</span></p>
                        <div class="border-b-2 border-green-500 mt-4 w-8"></div>
                    </div>
                    <img src={oip} className='h-16 w-16' />
                </div>
                {
                    cartItem.length > 0 ? (
                        <>
                            {/* cart items */}
                            <div class="flex flex-col -m-4">
                                <div class="border rounded-lg p-4">
                                    <div class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 ml-4 text-green-400" viewBox="0 0 24 24">
                                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4" className='bg-green-200'></circle>
                                        </svg>
                                        <div class="flex-grow sm:pl-8">
                                            <h2 class="title-font font-medium text-lg text-gray-900">{currentStore?.storeName}</h2>
                                            <h3 class="text-gray-500 text-xs">{currentStore?.storeAddress}</h3>
                                            <p className='text-xs text-gray-500'>{dist?.toFixed(1)}KM far from you. <span className='font-bold text-gray-700'>Deliver in {getExpectedTime(dist)} MINS</span></p>
                                        </div>
                                    </div>
                                    <div className='w-full border-b-2 border-dashed border-gray-200 mt-5'></div>
                                    {
                                        cartItem && cartItem.map((curr) => {
                                            return (
                                                <>
                                                    <div className='flex justify-between items-center px-4 mt-4'>
                                                        <div className='flex items-center space-x-4'>
                                                            <img src={cartIcons} alt="" className='flex-shrink-0 rounded-full h-8 w-8 object-center sm:mb-0 mb-4' />
                                                            <div>
                                                                <p className='text-sm '>{curr.productName}</p>
                                                                <small className='text-[10px]'>₹{curr.productPrice + " /" + curr.productBaseUnit + "" + curr.productUnit}</small>
                                                            </div>
                                                        </div>
                                                        <div className='flex items-center space-x-8'>
                                                            <div className='flex items-center space-x-2 border px-2 py-1 bg-green-500 text-white rounded-lg'>
                                                                <svg onClick={() => decreseQuantity(curr)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="cursor-pointer w-4 h-4">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                                                                </svg>
                                                                <p className='text-sm'>{curr.quantity}</p>
                                                                <svg onClick={() => increaseQuantity(curr)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="cursor-pointer w-4 h-4">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                                                                </svg>
                                                            </div>
                                                            <p className='text-sm'>₹{curr.actualPrice}</p>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {/* Coupon */}
                            <div className='flex items-center justify-center space-x-6 border-2 px-4 py-3 border-dashed'>
                                <img src={discount} className='w-6 h-6' alt="" />
                                <p>Apply Coupon</p>
                            </div>
                            {/* Bills */}
                            <div className='text-sm'>
                                <h4 className='text-light'>Bill Details</h4>
                                <p className='flex items-center justify-between'>
                                    <span>Item Total</span>
                                    <span>₹{itemTotal && itemTotal}</span>
                                </p>
                                <p className='flex items-center justify-between mb-3'>
                                    <span>Delivery Fee | {dist?.toFixed(1)} kms</span>
                                    <span>₹{getExpectedFair(dist)}</span>
                                </p>
                                <div className='border-b-2 bg-gray-400'></div>
                                <p className='flex items-center justify-between mt-3'>
                                    <span>Govt Taxes & Other Charges (5%)</span>
                                    <span>₹{itemTotal && getTax(itemTotal)}</span>
                                </p>
                                <button
                                    onClick={handleProceed}
                                    type="submit"
                                    className="mt-3 flex w-full justify-center border-transparent bg-green-500 py-4 px-4 text-sm font-medium text-white shadow-sm "
                                >
                                    Proceed to checkout <span className='text-[18px] font-semibold ml-2'>₹{
                                        itemTotal + getExpectedFair(dist) + getTax(itemTotal)
                                    }</span>
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className='flex flex-col items-center space-y-2 justify-center h-[50vh] '>
                            <img className='w-24 h-24' src={emptyCart} />
                            <p>Empty Cart!</p>
                        </div>
                    )
                }



            </div>
        </div>
    )
}

export default CartComponent
