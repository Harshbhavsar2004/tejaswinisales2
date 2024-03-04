import React from 'react';
import './CSS/About.css'; // Import your CSS file for styling
import image from '../components/Assests/product.png'

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h2>About Us</h2>
        <hr />
        <div className="product-details">
          <div className="product-image">
            <img src={image} alt="TV Protector Image 1" />
          </div>
          <div className="product-image">
            <img src={image} alt="TV Protector Image 2" />
          </div>
          <hr />
          <p>
          Protect your valuable investment with our premium TV screen protection solutions. From sleek and stylish screen guards to durable covers, we've got you covered. Say goodbye to scratches, smudges, and glare, and enjoy crystal-clear viewing for years to come.
          </p>
          <p>
          Shield your TV from life's unexpected mishaps with our cutting-edge screen protection technology. Our products offer unmatched durability and clarity, ensuring your viewing experience remains pristine. Invest in peace of mind and safeguard your entertainment centerpiece with our trusted solutions.
          </p>
        </div>
        <hr />
        <div className="google-map">
          {/* Replace the iframe src with your Google Map embed code */}
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3727.0706269527304!2d74.77266557476608!3d20.909477991865703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdec5e593cdb013%3A0x87bc98ed827c137a!2z4KSt4KS_4KSh4KWH4KSs4KS-4KSX!5e0!3m2!1sen!2sin!4v1709489096589!5m2!1sen!2sin" width="600" height="450"  allowFullScreen=""></iframe>
          <hr />
          </div>
        
      </div>
      
      <div className="thank-you-message">
        <p>Thank you for visiting!</p>
      </div>
    </div>
  );
};

export default AboutUs;
