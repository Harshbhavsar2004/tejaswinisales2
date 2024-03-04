import React from 'react'
import './Description.css'
const DescriptionBox = () => {
  return (
    <div className='DescriptionBox'>
        <div className="DescriptionBox-navigator">
            <div className="DescriptionBox-nav-box">
                Description
            </div>
            <div className="DescriptionBox-nav-box fade">
               Reviews(122)
            </div>
        </div>
        <div className="DescriptionBox-description">
            <p>Introducing our TC Screen Guard, meticulously designed to safeguard your eyes from harmful blue light emitted by screens. Crafted with advanced technology, it reduces eye strain and promotes healthier screen time habits. Experience unparalleled clarity and comfort, ensuring your eyes stay protected with every glance.</p>
       <p>Elevate your eye safety with our TC Screen Guard, engineered to defend against the detrimental effects of prolonged screen exposure. With a specialized coating, it blocks harmful blue light, reducing the risk of eye fatigue, dryness, and potential long-term damage. Prioritize your eye health without compromising on screen time, thanks to our innovative solution that offers both protection and clarity.</p>
        </div>
    </div>
  )
}

export default DescriptionBox