import React from "react";
import '../ProductItem/productItem.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/slices/cartSlice';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';
import { removeProduct } from '../../redux/slices/productSlice';
import {useAuth} from '../../context/AuthContext';
const ProductItem = ({item})=>{
    const {image, title, category, description, price, isWishlist} = item;
    const { user, userType } = useAuth();
    //console.log('title', title, item)
    const nav = useNavigate();
    const dispatch = useDispatch();

    const handleCardClick = ()=>{
        nav('/detail',{state:item})
    }

    const handleAddCart = (event) =>{
        event.stopPropagation(); // Stop the event propagation
        dispatch(addItemToCart(item))
    }
    const handleHeartClick = (event) => {
        event.stopPropagation(); // Stop the event propagation
        dispatch(toggleWishlist(item))
      };

    const handleDeleteClick = (event) =>{
        event.stopPropagation();
        dispatch(removeProduct(item));
    };

    const handleEdit = (event) => {
        event.stopPropagation();
        //dispatch
        //setEditProductData(item);
    };

    return(
        <div className='grid-item' onClick={ userType !== 'admin' ? handleCardClick : null}>
            <img src={image} alt="Product Image" width='200' height='200'/>
            <div className="item-header">{title}</div>
            <p className='item-category'>Category: {category}</p>
            <p className="category-prices">Price: ${price}</p>
            <div className='footer-view'>
                {user.type !== 'admin' ? <button className="add-cart-btn" onClick={handleAddCart}>Add to cart</button> : <button className="add-cart-btn" onClick={handleEdit}>Edit</button>}
                {user.type !== 'admin' && (!isWishlist ? <FaHeart style={{ color: 'gray' }} onClick={handleHeartClick}/> : <FaHeart style={{ color: 'red' }} onClick={handleHeartClick}/>)}
                {user.type ==='admin' && <FaTrash style={{ color: 'gray' }} onClick={handleDeleteClick}/>}
            </div>
        </div>
    )
}

export default ProductItem;