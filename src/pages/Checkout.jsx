import React, { useContext, useEffect } from 'react'
import HomeNav from '../components/navs/HomeNav'
import Delivery from '../components/cart/Delivery'
import CheckoutCart from '../components/cart/CheckoutCart'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'


const Checkout = () => {
  const { checkOutData } = useContext(AuthContext)
  const router = useNavigate();
  useEffect(() => {
    if(!checkOutData){
      router("/dashboard")
    }
  }, [])
  
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
