import React from 'react'
import ImageCarousel from '../components/home/ImageCarousel'
import FeaturedProperties from '../components/home/FeaturedProperties'
import HowItWorks from '../components/home/HowItWorks'
import CallToAction from '../components/home/CallToAction'

const HomePage = () => {
  return (
    <div>
      <ImageCarousel/>
      <FeaturedProperties/>
      <HowItWorks/>
      <CallToAction/>
    </div>
  )
}

export default HomePage