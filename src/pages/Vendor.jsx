import React, { useEffect, useState } from 'react'
import HomeNav from '../components/navs/HomeNav'
import VendorDetailComponent from '../components/vendor/VendorDetailComponent'
import Products from '../components/vendor/Products'
import HashLoader from "react-spinners/HashLoader"


const Vendor = () => {

  const [loader, setLoader] = useState(false);

  // useEffect(() => {
  // <HashLoader color="#36d7b7" />
  // })

  useEffect(() => {
    document.title = "VegFru | Vendor Details"
  }, [])

  return (
    <div>
      <HomeNav />
      {
        loader ? (
          <div className='flex justify-center mt-[200px]'>
            <HashLoader color="#36d7b7" />
          </div>
        ) : (
          <div className='flex flex-col sm:flex-row'>
            <VendorDetailComponent />
            <Products />
          </div>
        )
      }
    </div >
  )
}

export default Vendor
