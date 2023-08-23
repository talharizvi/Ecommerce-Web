import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';

export default configureStore({
    reducer: {
        cartItems: cartReducer,
        wishlistItems: wishlistReducer,
    }
})