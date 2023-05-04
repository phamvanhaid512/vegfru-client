import React, { useEffect } from 'react'
import HomeNav from '../components/navs/HomeNav'
import MapBox from '../components/maps/MapBox'

const Dashboard = () => {
  useEffect(() => {
    document.title = "VegFru | Dashboard"
  },[])
  return (
    <div>
      <HomeNav />
      <MapBox />
      
    </div>
  )
}

export default Dashboard
