
import {selectProducts, addProduct } from '../../redux/slices/productSlice';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/ProductItem';
import TableView from '../../components/TableView/TableView';

function Products() {
    const productsItems = useSelector(selectProducts);
    console.log('productsItems', productsItems)
    return (
        <div>
            {/* {productsItems.length>0 ? 
            <div className='grid-container'>{productsItems.map(item => <ProductItem item={item} />)}</div> : <div className='no-items-found'>No wishList items</div>} */}
            {productsItems.length>0 && <TableView data = {productsItems}/>}
        </div>
    )
}

export default Products