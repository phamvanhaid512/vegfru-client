import React, { useContext, useState, useEffect } from 'react'
import HomeNav from '../components/navs/HomeNav'
import ProfileComponent from '../components/profile/ProfileComponent'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'

const Profile = () => {
  const { getLocation, fetchAddress, setLoader } = useContext(AuthContext)
  const [totalOrder, setTotalOrder] = useState();
  const [orderList, setOrderList] = useState()

  const fetchOrder = async () => {
    setLoader(true)
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": "Bearer " + JSON.parse(localStorage.getItem("jwt"))
        },
      };

      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/order/customer/get-order`, config);
      // console.log(data)
      setOrderList(data.orderData)
      setTotalOrder(data.orderData.length)

    } catch (error) {
      console.log(error)
    }
    setLoader(false)
  }


  useEffect(() => {
    document.title = "VegFru | Profile"
    getLocation()
    fetchOrder()
    fetchAddress()

  }, [])
  return (
    <div>
      <HomeNav />
      <ProfileComponent orderList={orderList} totalOrder={totalOrder} />
    </div>
  )
}

export default Profile
