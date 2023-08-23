import './Wishlist.css';
import { Outlet, Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header/Header';
import Modal from '../../components/Modal/Modal';
import {useState} from 'react';
import {selectWishList, toggleWishlist } from '../../redux/slices/wishlistSlice';
import { addItemToCart, selectCartItems } from '../../redux/slices/cartSlice';
import ProductItem from '../../components/ProductItem';

export default function WishListScreen(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log('test', selectWishList, selectCartItems)

    //const wishListItems = useSelector((state)=>console.log('123',state.wishListedItems));
    const wishListItems = useSelector(selectWishList);
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    //const [cartItems, setCartItems] = useState('')
    console.log('wishListItems',wishListItems, 'cartItemss');
    //console.log(data);
    //const {image, title, category, description, price} = data;
    const toggleWishlistItem = () =>{
        //setIsModalOpen(true)
        dispatch(toggleWishlist())
    }

    // const renderWishListItems = () => {
    //     return (
    //       <div className="cart-item-container">
    //         {wishListItems?.map((item) => (
    //           <div className="cart-item">
    //             <img src={item.image} alt="Product Image" width="20" height="20" />
    //             <div className="item-details">
    //               <h1>{item.title}</h1>
    //               <p>Category: {item.category}</p>
    //               <p>Price: $ {item.price}</p>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     );
    //   };
    return(
        <div className="cardView">
            <Header count={cartItems.length}/>
            {/* {renderWishListItems()} */}
            {wishListItems.length>0 ? 
            <div className='grid-container'>{wishListItems.map(item => <ProductItem item={item} />)}</div> : <div className='no-items-found'>No wishList items</div>}
            
            {/* {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />} */}
        </div>
    )
}