import React from 'react'
import HomeNav from '../components/navs/HomeNav'
import Delivery from '../components/cart/Delivery'
import CheckoutCart from '../components/cart/CheckoutCart'


const Checkout = () => {
  return (
    <div>
      <HomeNav />
      <div className='flex md:flex-row flex-col space-y-10 md:space-y-0 justify-evenly px-5 md:px-24 mt-32'>
        <Delivery />
        <CheckoutCart />
      </div>
    </div>
  )
}

export default Checkout
