import React from 'react'
import './Newsletter.css'
const Newsletter = () => {
  return (
    <div className='Newsletter'>
        <h1>Get Exclusive Offers On Youre Email</h1>
        <p>Subscribe to our Newsletter and stay updated</p>
        <div>
            <input type="email" placeholder='Youre Email Id' />
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default Newsletter