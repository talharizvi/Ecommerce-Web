import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from '../screens/Home';
import DetailScreen from '../screens/Detail';
import CartScreen from '../screens/Cart';
import WishListScreen from '../screens/Wishlist';

const Router = () =>{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomeScreen/>} />
            <Route path="/detail" element={<DetailScreen/>} />
            <Route path="/shop" element={<CartScreen/>} />
            <Route path="/wishList" element={<WishListScreen/>} />
        </Routes>
                
        </BrowserRouter>
    )
}

export default Router;