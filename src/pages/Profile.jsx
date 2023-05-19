import React, { useContext, useEffect } from 'react'
import HomeNav from '../components/navs/HomeNav'
import ProfileComponent from '../components/profile/ProfileComponent'
import { AuthContext } from '../context/AuthContext'

const Profile = () => {
  const { getLocation } = useContext(AuthContext)
  useEffect(() => {
    document.title = "VegFru | Profile"
    getLocation()
  },[])
  return (
    <div>
      <HomeNav />
      <ProfileComponent />
    </div>
  )
}

export default Profile
