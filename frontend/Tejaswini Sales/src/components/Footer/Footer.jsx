import React, { useState } from 'react'
import './Footer.css'
import instagram_icon from '../Assests/instagram_icon.png'
import pintester_icon from '../Assests/pintester_icon.png'
import whatsapp_icon from '../Assests/whatsapp_icon.png'
import { Link } from 'react-router-dom'
import logo from '../Assests/tejaswini-sales-high-resolution-logo-black-transparent.png'
const Footer = () => {
    const [menu, setMenu] = useState("shop");
    return (
        <div className='Footer'>
            <div className="Footer-logo">
                <img src={logo} alt="" />
            </div>
            <ul className="footer-links">
                <li onClick={() => { setMenu("shop") }}> <Link style={{ textDecoration: 'none' }} to='/'>Shop</Link> {menu == "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("mens") }}><Link style={{ textDecoration: 'none' }} to='/Store'>Visit Store</Link>{menu == "mens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("About") }}><Link style={{ textDecoration: 'none' }} to='/About'>About us</Link>{menu == "About" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("Contact") }}><Link style={{ textDecoration: 'none' }} to='/Contact'>Contact</Link>{menu == "Contact" ? <hr /> : <></>}</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <a href="https://www.instagram.com/tejaswinisales.in/0" target='blank'>
                    <img src={instagram_icon} alt="" />
                    </a>
                </div>
                {/* <div className="footer-icons-container">
                    <img src={pintester_icon} alt="" />
                </div> */}
                <div className="footer-icons-container">
                   <a href="https://www.instagram.com/tejaswinisales.in/">
                   <img src={whatsapp_icon} alt="" />
                   </a>
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @2024 - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer