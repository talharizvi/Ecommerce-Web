import React from 'react';
import { FaShoppingCart, FaHeart, FaSignOutAlt } from 'react-icons/fa'; // Import the shopping cart icon
import './Header.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header({count}) {

    const {user, logout} = useAuth();
    const nav = useNavigate();

    const handleNavigate = ()=>{
        nav('/shop')
    }

  const handleCartIconClick = () => {
    // Add your click event logic here
    handleNavigate()
  };

  const handleHeartClick = () => {
    //handleNavigate()
    nav('/wishlist')
  };

  const handleLogoutClick = () => {
    // Add your logout logic here
    logout()
    // Redirect or perform your logout action
    nav('/')
  };



  return (
    <header className="header">
      <h1>E-Kart</h1>
      <div className='icon-view'>
      {user?.type !== 'admin' && <FaHeart style={{ color: 'white', marginRight:8 }} onClick={handleHeartClick}/>}
      {user?.type !== 'admin' && <div className="cart-icon" onClick={handleCartIconClick}>
        <FaShoppingCart />
        <span className="cart-count">{count ? count : 0}</span>
      </div>}
      <FaSignOutAlt
          style={{ color: 'white', marginLeft: 8, cursor: 'pointer' }}
          onClick={handleLogoutClick}
        />
      </div>
    </header>
  );
}

export default Header;