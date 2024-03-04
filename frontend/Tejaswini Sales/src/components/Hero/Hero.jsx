import React from 'react'
import './Hero.css'
import handicon from '../Assests/hand_icon.png'
import arrow_icon from '../Assests/arrow.png'
import hero_img from '../Assests/product.png'
const Hero = () => {

        const handleClick = () => {
          const scrollDistance = 2150;
          window.scrollBy({
            top: scrollDistance,
            behavior: 'smooth'
          });
        };
    return (
        <div className="hero">
            <div className="Hero-left">
                <h2>NEW ARRIVALS ONLY</h2>

                <div>
                    <div className="hero-hand-icon">
                        <p>new</p>
                        <img src={handicon} alt="" />
                    </div>
                    <p>collections</p>
                    <p>for everyone</p>
                </div>
                <div className="hero-latest-button">
                 <button onClick={handleClick}>Latest collections <img src={arrow_icon} alt="" /></button>   
                    
                </div>
            </div>
            <div className="Hero-right">
                <img src={hero_img} alt="" />
            </div>
        </div>
    )
}

export default Hero