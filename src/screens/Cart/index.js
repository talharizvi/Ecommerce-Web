import '../Cart/Cart.css';
import { Outlet, Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart, selectCartItems, resetCartItems } from '../../redux/slices/cartSlice';
import Header from '../../components/Header/Header';
import Modal from '../../components/Modal/Modal';
import {useState} from 'react';

export default function CartScreen(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const data = location.state;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    //const [cartItems, setCartItems] = useState('')
    console.log('cartItemss',cartItems);
    //console.log(data);
    //const {image, title, category, description, price} = data;
    const handleAddCart = () =>{
        setIsModalOpen(true)
        dispatch(resetCartItems())
    }

    const renderCartItems = () => {
        return (
          <div className="cart-item-container">
            {cartItems?.map((item) => (
              <div className="cart-item">
                <img src={item.image} alt="Product Image" width="20" height="20" />
                <div className="item-details">
                  <h1>{item.title}</h1>
                  <p>Category: {item.category}</p>
                  <p>Price: $ {item.price}</p>
                </div>
              </div>
            ))}
          </div>
        );
      };
    return(
        <div className="cardView">
            <Header count={cartItems.length}/>
            {renderCartItems()}
            <button onClick={handleAddCart}>Place order</button>
            {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
        </div>
    )
}