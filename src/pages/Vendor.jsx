import React, { useContext, useEffect, useState } from 'react'
import HomeNav from '../components/navs/HomeNav'
import VendorDetailComponent from '../components/vendor/VendorDetailComponent'
import Products from '../components/vendor/Products'
import HashLoader from "react-spinners/HashLoader"
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { AiFillStar } from 'react-icons/ai'
import moment from 'moment'
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

          <div className="flex sm:flex-row flex-col">
            <div className="sm:w-1/3  sm:border-r-2 flex flex-col">
              <VendorDetailComponent singleStore={singleStore} />
            </div>
            <div className="sm:w-3/4">
              <Products singleStore={singleStore} />
            </div>
            <div className='md:hidden block mt-10 border-t text-sm px-8 font-semibold'>
              <h2 className='mb-3 mt-3'>Reviews & Ratings</h2>
              <div className=''>
                {
                  singleStore?.comments.map((review) => {
                    return (
                      <span class="flex space-x-2 mb-3 pl-4 py-2 border-b">
                        <span className='rounded-md flex text-green-500 '>4.5 <AiFillStar /></span>
                        <div className='flex flex-col'>
                          <div className='flex space-x-1'>
                            <span class="font-medium text-gray-900">{review.clientId.name}</span>
                            <span class="text-[11px] font-medium text-gray-400">{moment(review.time).utc().fromNow() == "a day ago"
                              ? "yesterday"
                              : moment(review.time).utc().fromNow()}</span>
                          </div>
                          <span class="text-gray-600 text-xs">{review.comment}</span>
                        </div>
                      </span>
                    )
                  }).reverse()
                }
              </div>
            </div>
          </div>

        )
      }
    </div >
  )
}

export default Vendor
