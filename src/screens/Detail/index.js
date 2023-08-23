import '../Detail/Detail.css';
import { Outlet, Link, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart, selectCartItems } from '../../redux/slices/cartSlice';
import Header from '../../components/Header/Header';

export default function DetailScreen(){
    const location = useLocation();
    const data = location.state;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    //const [cartItems, setCartItems] = useState('')
    console.log('cartItems',cartItems);
    //console.log(data);
    const {image, title, category, description, price} = data;
    const handleAddCart = () =>{
        dispatch(addItemToCart(data))
    }
    return(
        <div className="cardView">
            <Header count={cartItems.length}/>
            <img src={image} alt="Product Image" width='400' height='400'/>
            <h1>{title}</h1>
            <p>Category: {category}</p>
            <p>{description}</p>
            <p>$ {price}</p>
            <button onClick={handleAddCart}>Add to cart</button>
        </div>
    )
}