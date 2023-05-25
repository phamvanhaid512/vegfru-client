import React, {useEffect } from 'react'
import HomeNav from '../components/navs/HomeNav'
import ProfileComponent from '../components/profile/ProfileComponent'
import axios from 'axios'

const Profile = () => {

  useEffect(() => {
    document.title = "VegFru | Profile"
  }, [])
  return (
    <div>
      <HomeNav />
      <ProfileComponent />
    </div>
  )
}

export default Profile
