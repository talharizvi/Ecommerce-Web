import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductItem from '../../components/ProductItem';
import '../Home/Home.css';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart, selectCartItems } from '../../redux/slices/cartSlice';
import { selectWishList } from '../../redux/slices/wishlistSlice';
import Header from '../../components/Header/Header';
import CarouselView from '../../components/Carousel';

export default function HomeScreen(){
    const [loading, setLoading] = useState(true);
    const [productsData, setProductsData] = useState([])
    const cartItems = useSelector(selectCartItems)
    const wishlistItems = useSelector(selectWishList);
    //const dispatch = useDispatch()
    //const [cartItems, setCartItems] = useState('')
    console.log('cartItemss',cartItems)
    
    const nav = useNavigate();


    const handleBestSellerCardClick = (item)=>{
      console.log('itemsdsd',item)
      nav('/detail',{state:item})
    }

    useEffect(()=>{
        //fetch products api
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
                //console.log(json)
                setProductsData(json)   
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
              }); 
    },[])

    //console.log('inisde home', productsData)

    // const renderBestSellerCarousel = ()=>{
    //   return(
    //     <div className='root-best-seller'>
    //       <div className='carousel-title'>Best sellers</div>
    //       {/* {productsData.map(item => <ProductItem item={item} />)} */}
    //       <div className="carousel-container">
    //     {productsData.map((item, index) => (
    //       <div key={index} className="carousel-item" onClick={()=>handleBestSellerCardClick(item)}>
    //         <img src={item.image} alt="Product Image" width='180' height='180' />
    //         <div className='item-title'>{item.title}</div>
    //         <div>Price: $ {item.price}</div>
    //       </div>
    //     ))}
    //   </div>
    //     </div>
    //   )
    // }

    return (
        <div className='root'>
      <Header count={cartItems.length} />
      
        {loading ? (
          <div className='loader-container'>
          <div className='loader'>Loading...</div>
          </div>
        ) : (
        <div className='grid-container'>
          {productsData.map(item => <ProductItem item={item} />)}
          </div>
        )}
        {/* {renderBestSellerCarousel()} */}
        <CarouselView title='Best sellers' data={productsData} handleCardClick={handleBestSellerCardClick}/>
        {wishlistItems.length > 0 ? (
  <CarouselView title='Wishlisted Items' data={wishlistItems} handleCardClick={handleBestSellerCardClick}/>
) : (
  <div className="card">
    <p className="card-text">Start adding products in your wishlist</p>
  </div>
)}
        
      </div>
    )
}