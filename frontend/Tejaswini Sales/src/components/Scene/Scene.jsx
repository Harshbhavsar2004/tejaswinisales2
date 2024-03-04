import React from 'react'
import './Scene.css'
import videoforbackgrund from '../Assests/TV Screen Guard.mp4'
const Scene = () => {
  return (
    <div className='Scene'>
        <video src={videoforbackgrund} autoPlay loop muted controls></video>
    </div>
  )
}

export default Scene