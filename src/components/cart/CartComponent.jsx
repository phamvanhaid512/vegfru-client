import React from 'react'
import oip from "../../img/OIP.jpeg"
import { ToastContainer, toast } from 'react-toastify';
import cartIcons from "../../img/cartIcons.png"
import discount from "../../img/discount.png"
import { useNavigate } from "react-router-dom"


const CartComponent = () => {
    const navigate = useNavigate();
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
                {/* cart items */}
                <div class="flex flex-col -m-4">
                    <div class="border rounded-lg p-4">
                        <div class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                            <img alt="team" class="flex-shrink-0 rounded-full h-16 w-16 object-center sm:mb-0 mb-4" src="https://bit.ly/sage-adebayo" />
                            <div class="flex-grow sm:pl-8">
                                <h2 class="title-font font-medium text-lg text-gray-900">Ramesh Patnayak</h2>
                                <h3 class="text-gray-500 text-xs">Hussainpur, Madurdaha</h3>
                                <p className='text-xs text-gray-500'>3.2KM far from you. <span className='font-bold text-gray-700'>Deliver in 40 MINS</span></p>
                            </div>
                        </div>
                        <div className='w-full border-b-2 border-dashed border-gray-200 mt-5'></div>
                        <div className='flex justify-between items-center px-4 mt-4'>
                            <div className='flex items-center space-x-4'>
                                <img src={cartIcons} alt="" className='flex-shrink-0 rounded-full h-8 w-8 object-center sm:mb-0 mb-4' />
                                <div>
                                    <p className='text-sm '>Potato (Old)</p>
                                    <small>250g</small>
                                </div>
                            </div>
                            <div className='flex items-center space-x-8'>
                                <div className='flex items-center space-x-2 border px-2 py-1 bg-green-500 text-white rounded-lg'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                                    </svg>
                                    <p className='text-sm'>2</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                                    </svg>
                                </div>
                                <p className='text-sm'>₹40</p>
                            </div>
                        </div>
                        <div className='flex justify-between items-center px-4 mt-4'>
                            <div className='flex items-center space-x-4'>
                                <img src={cartIcons} alt="" className='flex-shrink-0 rounded-full h-8 w-8 object-center sm:mb-0 mb-4' />
                                <div>
                                    <p className='text-sm '>Lady finger</p>
                                    <small>250g</small>
                                </div>
                            </div>
                            <div className='flex items-center space-x-8'>
                                <div className='flex items-center space-x-2 border px-2 py-1 bg-green-500 text-white rounded-lg'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                                    </svg>
                                    <p className='text-sm'>2</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                                    </svg>
                                </div>
                                <p className='text-sm'>₹33</p>
                            </div>
                        </div>
                        <div className='flex justify-between items-center px-4 mt-4'>
                            <div className='flex items-center space-x-4'>
                                <img src={cartIcons} alt="" className='flex-shrink-0 rounded-full h-8 w-8 object-center sm:mb-0 mb-4' />
                                <div>
                                    <p className='text-sm '>Onion</p>
                                    <small>1kg</small>
                                </div>
                            </div>
                            <div className='flex items-center space-x-8'>
                                <div className='flex items-center space-x-2 border px-2 py-1 bg-green-500 text-white rounded-lg'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                                    </svg>
                                    <p className='text-sm'>2</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                                    </svg>
                                </div>
                                <p className='text-sm'>₹24</p>
                            </div>
                        </div>
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
                        <span>₹40</span>
                    </p>
                    <p className='flex items-center justify-between mb-3'>
                        <span>Delivery Fee | 0.2 kms</span>
                        <span>₹33</span>
                    </p>
                    <div className='border-b-2 bg-gray-400'></div>
                    <p className='flex items-center justify-between mt-3'>
                        <span>Govt Taxes & Other Charges</span>
                        <span>₹22.5</span>
                    </p>
                    <button
                        onClick={() => navigate("/checkout")}
                        type="submit"
                        className="mt-3 flex w-full justify-center border-transparent bg-green-500 py-4 px-4 text-sm font-medium text-white shadow-sm "
                    >
                        Proceed to checkout <span className='text-[18px] font-semibold ml-2'>₹95</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartComponent