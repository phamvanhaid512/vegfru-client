import React, { useContext, useEffect, useState } from 'react'
import HomeNav from '../components/navs/HomeNav'
import VendorDetailComponent from '../components/vendor/VendorDetailComponent'
import Products from '../components/vendor/Products'
import HashLoader from "react-spinners/HashLoader"
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const Vendor = () => {

  const { loader, setLoader } = useContext(AuthContext)
  const [singleStore, setSingleStore] = useState();
  const params = useParams();
  const storeId = params.storeId;

  const getStoreById = async () => {
    setLoader(true)
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": "Bearer " + JSON.parse(localStorage.getItem("jwt"))
        },
      };
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/vendor/get-store/${storeId}`, config)
      setSingleStore(data.store);
    } catch (error) {
      console.log(error)
    }
    setLoader(false)
  }

  useEffect(() => {
    document.title = "VegFru | Vendor Details"
    getStoreById()
  }, [])


  return (
    <div>
      <HomeNav />
      {
        loader ? (
          <div className='flex justify-center mt-[400px]'>
            <HashLoader color="#36d7b7" />
          </div>
        ) : (
          <div className='flex flex-col sm:flex-row'>
            <VendorDetailComponent singleStore={singleStore} />
            <Products />
          </div>
        )
      }
    </div >
  )
}

export default Vendor
