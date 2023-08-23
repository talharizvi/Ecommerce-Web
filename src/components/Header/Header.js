import React from 'react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa'; // Import the shopping cart icon
import './Header.css';
import { Link, Navigate, useNavigate } from 'react-router-dom'

function Header({count}) {

    const nav = useNavigate();

    const handleNavigate = ()=>{
        nav('/shop')
    }

  const handleCartIconClick = () => {
    // Add your click event logic here
    console.log('Shopping cart icon clicked!');
    handleNavigate()
  };

  const handleHeartClick = () => {
    //handleNavigate()
    nav('/wishlist')
  };



  return (
    <header className="header">
      <h1>E-Kart</h1>
      <div className='icon-view'>
      <FaHeart style={{ color: 'white', marginRight:8 }} onClick={handleHeartClick}/>
      <div className="cart-icon" onClick={handleCartIconClick}>
        <FaShoppingCart />
        <span className="cart-count">{count ? count : 0}</span>
      </div>
      </div>
    </header>
  );
}

export default Header;