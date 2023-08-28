import React from "react";
import '../ProductItem/productItem.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/slices/cartSlice';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';
const ProductItem = ({item})=>{
    const {image, title, category, description, price, isWishlist} = item;
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
    return(
        <div className='grid-item' onClick={handleCardClick}>
            <img src={image} alt="Product Image" width='200' height='200'/>
            <div className="item-header">{title}</div>
            <p className='item-category'>Category: {category}</p>
            {/* <p className="category-prices">Price: <span className='category-prices'>$ {price}</span></p> */}
            <p className="category-prices">Price: ${price}</p>
            <div className='footer-view'>
                <button className="add-cart-btn" onClick={handleAddCart}>Add to cart</button>
                {!isWishlist ? <FaHeart style={{ color: 'gray' }} onClick={handleHeartClick}/> : <FaHeart style={{ color: 'red' }} onClick={handleHeartClick}/>}
                
            </div>
        </div>
    )
}

export default ProductItem;