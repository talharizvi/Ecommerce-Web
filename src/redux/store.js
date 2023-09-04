import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import productListReducer from './slices/productSlice';

export default configureStore({
    reducer: {
        cartItems: cartReducer,
        wishlistItems: wishlistReducer,
        productItems: productListReducer,
    }
})