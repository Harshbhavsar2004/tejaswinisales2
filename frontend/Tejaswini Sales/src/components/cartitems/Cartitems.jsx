import React, { useContext } from 'react'
import './CartItems.css'
import remove_icon from '../Assests/cart_cross_icon.png'
import { Shopcontext } from '../../Context/ShopContect'
import logo from "../Assests/tejaswini-sales-high-resolution-logo-black-transparent.png"
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'
const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removefromcart } = useContext(Shopcontext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to check if the user is logged in
    const checkLoginStatus = () => {
        // Check if token exists in localStorage
        const token = localStorage.getItem('auth-token');
        return token !== null;
    };

    const handleLogin = () => {
        // Logic for handling successful login
        setIsLoggedIn(true);
        // Set token in localStorage upon successful login
        localStorage.setItem('auth-token', token);
    };

    const handleLogout = () => {
        // Logic for handling logout
        setIsLoggedIn(false);
        // Remove token from localStorage upon logout
        localStorage.removeItem('auth-token');
    };

    const handleProceedToPayment = async () => {
        if (checkLoginStatus()) {
          const amount = getTotalCartAmount();
          const currency = 'INR';
          const receiptID = 'qwsal1';
    
          try {
            // Fetch order details from your server
            const response = await fetch('http://localhost:4000/order', {
              method: 'POST',
              body: JSON.stringify({
                amount,
                currency,
                receipt: receiptID,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch order details');
            }
    
            const order = await response.json();
            console.log(order);
    
            // Initialize Razorpay
            const options = {
              key: 'rzp_test_Y8KhYysnUCd19c', // Enter the Key ID generated from the Razorpay Dashboard
              amount,
              currency,
              name: 'Tejaswini Sales',
              description: 'Test Transaction',
              image: '',
              order_id: order.id,
              prefill: {
                name: 'Gaurav Kumar',
                email: 'gaurav.kumar@example.com',
                contact: '9000090000',
              },
              notes: {
                address: 'Razorpay Corporate Office',
              },
              theme: {
                color: '#3399cc',
              },
              handler: function (response) {
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature);
              },
              preOpen: function() {
                // Add preOpen hook if required
              },
              modal: {
                ondismiss: function() {
                  // Add ondismiss hook if required
                }
              }
            };
    
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
    
          } catch (error) {
            console.error('Error processing payment:', error);
            toast.error('Error processing payment. Please try again later.');
          }
        } else {
          // Show toast message and redirect to login page after 2 seconds
          toast.warn('🦄 Login First!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000); // 2000 milliseconds = 2 seconds
        }
      };






return (
    <div className='Cartitems '>
        <div className="cartItems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        <div>
            <div className="Cartitems-format ">
                <img src="" alt="" className='carticon-product-icon' />
                <p></p>
                <p></p>
                <p></p>
            </div>

            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return <div>
                        <div className="Cartitems-format cartItems-format-main">
                            <img src={e.image} alt="" className='carticon-product-icon' />
                            <p>{e.name}</p>
                            <p>Rs{e.new_price}</p>
                            <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                            <p>Rs{e.new_price * cartItems[e.id]} </p>
                            <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removefromcart(e.id) }} alt="" />
                        </div>
                        <hr />
                    </div>
                }
                return null;
            })}

            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>Rs{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>Rs{getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <div className='cartitems-total button'>
                    {/* Conditionally rendering based on login status
                    {isLoggedIn ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <button onClick={handleLogin}>Login</button>
                    )} */}
                    
                    <button  onClick={handleProceedToPayment}>Proceed to Payment</button>
                   
                </div>
                <ToastContainer />
                </div>
                
                <div className="cartitems-promocode">
                    <p>If you have a promo code , Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='promo code' />
                        <button>submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default CartItems