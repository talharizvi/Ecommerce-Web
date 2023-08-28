import '../Cart/Cart.css';
import { Outlet, Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart, selectCartItems, resetCartItems, changeCartItemQuantity, removeCartItem } from '../../redux/slices/cartSlice';
import Header from '../../components/Header/Header';
import Modal from '../../components/Modal/Modal';
import {useState} from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";

export default function CartScreen(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);

  
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    //const [cartItems, setCartItems] = useState('')
    console.log('cartItemss',cartItems);
    //const {image, title, category, description, price} = data;
    const handleAddCart = () =>{
        setIsModalOpen(true)
        dispatch(resetCartItems())
    }

    const calculateTotalAmount = (cartItems) => {
      const total = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      return total.toFixed(2)
    };
    
    const totalAmount = calculateTotalAmount(cartItems);

    //   const testCartdata = [
    //     {
    //       "id": 1,
    //       "title": "Fjallraven - Foldsack No. 1 Backpack, 15 inch Laptop",
    //       "price": 109.95,
    //       "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    //       "category": "electronics",
    //       "image": "https://rukminim2.flixcart.com/image/300/300/kwnv6a80/computer/9/c/i/-original-imag9aajekwegabt.jpeg?q=70",
    //       "rating": {
    //           "rate": 3.9,
    //           "count": 120
    //       },
    //       "images":[
    //           'https://rukminim2.flixcart.com/image/300/300/kwnv6a80/computer/9/c/i/-original-imag9aajekwegabt.jpeg?q=70',
    //           'https://rukminim2.flixcart.com/image/300/300/kwnv6a80/computer/z/o/t/-original-imag9aajzgy2gzzh.jpeg?q=70',
    //           'https://rukminim2.flixcart.com/image/300/300/kxgfzbk0/computer/q/8/c/-original-imag9wtvmzuyhxrz.jpeg?q=70',
    //       ],
    //       "isWishlist": false
    //   },
    //   {
    //       "id": 2,
    //       "title": "Mens Casual Premium Slim Fit T-Shirts ",
    //       "price": 22.3,
    //       "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    //       "category": "men's clothing",
    //       "image": "https://rukminim2.flixcart.com/image/300/300/l0pm3680/t-shirt/c/u/z/s-2115-the-dry-state-original-imagcfz6jz2pz53m.jpeg?q=70",
    //       "rating": {
    //           "rate": 4.1,
    //           "count": 259
    //       },
    //       "images": [
    //           'https://rukminim2.flixcart.com/image/300/300/l0pm3680/t-shirt/c/u/z/s-2115-the-dry-state-original-imagcfz6jz2pz53m.jpeg?q=70',
    //           'https://rukminim2.flixcart.com/image/300/300/l0pm3680/t-shirt/q/v/u/s-2115-the-dry-state-original-imagcfz68hfg6zrm.jpeg?q=70',
    //           'https://rukminim2.flixcart.com/image/300/300/l0pm3680/t-shirt/q/9/b/s-2115-the-dry-state-original-imagcfz6nkgfrvht.jpeg?q=70'
    //       ],
    //       "isWishlist": false
    //   },
    //   {
    //     "id": 1,
    //     "title": "Fjallraven - Foldsack No. 1 Backpack, 15 inch Laptop",
    //     "price": 109.95,
    //     "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    //     "category": "electronics",
    //     "image": "https://rukminim2.flixcart.com/image/300/300/kwnv6a80/computer/9/c/i/-original-imag9aajekwegabt.jpeg?q=70",
    //     "rating": {
    //         "rate": 3.9,
    //         "count": 120
    //     },
    //     "images":[
    //         'https://rukminim2.flixcart.com/image/300/300/kwnv6a80/computer/9/c/i/-original-imag9aajekwegabt.jpeg?q=70',
    //         'https://rukminim2.flixcart.com/image/300/300/kwnv6a80/computer/z/o/t/-original-imag9aajzgy2gzzh.jpeg?q=70',
    //         'https://rukminim2.flixcart.com/image/300/300/kxgfzbk0/computer/q/8/c/-original-imag9wtvmzuyhxrz.jpeg?q=70',
    //     ],
    //     "isWishlist": false
    // },
    //   ]

      const handleDecrease = (item) => {
        if (quantity > 1) {
          setQuantity(quantity - 1);
          dispatch(changeCartItemQuantity({...item, quantity: item.quantity ? item.quantity - 1 : quantity-1}))
        }
      };

      const handleIncrease = (item) => {
        setQuantity(quantity + 1);
        dispatch(changeCartItemQuantity({...item, quantity: item.quantity ? item.quantity + 1 : quantity+1}))
      };

      const handleRemove = (item) => {
        console.log('remove', item)
        dispatch(removeCartItem(item))
      }

//       return(
//         <div class="root-container">
//   <div class="left-view">Left View</div>
//   <div class="right-view">Right View</div>
// </div>
//       )

    return(
        <div className='root-cart'>
          <Header count={cartItems.length}/>
          {cartItems.length>0 ? 
            <div className='cart-left-view'>
            {cartItems?.map((item, index) => (
              <div className={index === cartItems.length-1 ? "cart-item": "cart-item-border"}>
                <div className='image-view'>
                    <img src={item.image} alt="Product Image" width="100" height="100" />
                    <div className="quantity-controls">
                      <button onClick={()=>handleDecrease(item)} className="icon-button">
                        <FaMinus />
                      </button>
                      {item.quantity}
                      <button onClick={()=>handleIncrease(item)} className="icon-button">
                        <FaPlus />
                      </button>
                    </div>
                </div>
                
                <div className="item-details">
                  <div className="title">{item.title}</div>
                  <p className="category">Category: {item.category}</p>
                  <p className="price">Price: $ {item.price}</p>
                  <div>
                    <button
                      className='remove-btn'
                      onClick={()=>handleRemove(item)}
                    >
                      Remove
                    </button>
                </div>
                  
                </div>
                
              </div>
            ))}
          </div>
          : <div className='no-items-found'>No items</div>}
          
          {cartItems.length>0 && <div className='cart-right-view'>
            <p className='price-details'>Price details</p>
            <div className='right-item'>
              <p>Price: </p>
              <p>${totalAmount}</p>
            </div>
            <div className='right-item'>
              <p>Delivery charges </p>
              <p>Free</p>
            </div>
            <div className='right-item'>
              <p>Total Amount: </p>
              <p>${totalAmount}</p>
            </div>
            {cartItems.length>0 && <button onClick={handleAddCart} className='place-order-btn'>Place order</button>}
          </div>}
          {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
        </div>
    )
}