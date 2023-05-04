import React, { useEffect } from 'react'
import HomeNav from '../components/navs/HomeNav'
import AboutComponent from '../components/about/AboutComponent'

const About = () => {
  useEffect(() => {
    document.title = "VegFru | About"
  },[])
  return (
    <div>
      <HomeNav />
      <AboutComponent />
    </div>
  )
}

export default About
