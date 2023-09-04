import '../Detail/Detail.css';
import { Outlet, Link, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart, selectCartItems } from '../../redux/slices/cartSlice';
import Header from '../../components/Header/Header';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa'; 

export default function DetailScreen(){
    const location = useLocation();
    const data = location.state;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    //const [cartItems, setCartItems] = useState('')
    //console.log('cartItems',cartItems);
    console.log(data);
    const {image, title, category, description, price, images, rating} = data;
    const [selectedImage, setSelectedImage] = useState(image);

    const handleAddCart = () =>{
        dispatch(addItemToCart(data))
    }

    return(
        <div className="layout">
            <Header count={cartItems.length} />
      <div className="left-column">
        <div className='carousel-item-view'>
        {/* {testImgs.map((item)=><div className='carousel-item'>{item}</div>)} */}
        {images.map((item)=><div onClick={()=>setSelectedImage(item?.url || item)}>
            <img src={item?.url || item} className='carousel-item' width={60} height={60}/>
        </div>)}
        </div>
        <img src={selectedImage} width='80%' height='80%'/>
      </div>
      <div className="right-column">
        <div>
        <div className="item-header">{title}</div>
            <p className='item-category'>Category: {category}</p>
            <p>{description}</p>
            <div className='rating-view'>
            <p>Rating: {rating?.rate}</p>
            <FaStar style={{ color: '#2196F3', marginLeft:4 }}/>
            </div>
            <p className='item-header'>Price: $ {price}</p>
            <div className='footer-view'>
                <button style={{marginRight: 15,
    backgroundColor: "#2196F3",
    color: "white",         
    border: "none",       
    borderWidth: 0,        
    padding: "10px 20px"}} onClick={handleAddCart}>Add to cart</button>
            </div>
        </div>
        </div>
    </div>
    )
}