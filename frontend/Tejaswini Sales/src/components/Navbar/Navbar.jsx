import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assests/tejaswini-sales-high-resolution-logo-black-transparent.png'
import cart_icon from '../Assests/cart_icon.png'
import { Link } from 'react-router-dom'
import { Shopcontext } from '../../Context/ShopContect'
import navmenulogo from '../Assests/bars-solid.jpg'

const Navbar = () => {

    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(Shopcontext);
    const menuRef = useRef()

    const dropdown_toggle = (e) => {

        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }
    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" />
            </div>
            <ul ref={menuRef} className='nav-menu'>
                <li onClick={() => { setMenu("shop") }}> <Link style={{ textDecoration: 'none' }} to='/'>Shop</Link> {menu == "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("mens") }}><Link style={{ textDecoration: 'none' }} to='/Store'>Visit Store</Link>{menu == "mens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("About") }}><Link style={{ textDecoration: 'none' }} to='/About'>About us</Link>{menu == "About" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("Contact") }}><Link style={{ textDecoration: 'none' }} to='/Contact'>Contact</Link>{menu == "Contact" ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token') ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button>
                    : <Link to='/login'><button>Login</button></Link>}
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
                <img className='nav-dropdown' onClick={dropdown_toggle} src={navmenulogo} alt="" />
            </div>


        </div>
    )
}

export default Navbar