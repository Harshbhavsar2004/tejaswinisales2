import React from 'react'
import Hero from '../components/Hero/Hero.jsx'
import Popular from '../components/Popular/Popular.jsx'
import Offers from "../components/offers/Offers.jsx"
import Newcollection from '../components/Newcollection/Newcollection.jsx'
import Newsletter from '../components/Newsletter/Newsletter.jsx'
import Scene from '../components/Scene/Scene.jsx'
const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers/>
      <Newcollection/>
      <Scene/>
      <Newsletter/>
    </div>
  )
}

export default Shop