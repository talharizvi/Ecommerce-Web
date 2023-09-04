import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from '../screens/Home';
import DetailScreen from '../screens/Detail';
import CartScreen from '../screens/Cart';
import WishListScreen from '../screens/Wishlist';
import LoginScreen from '../screens/Login';
import AdminScreen from '../screens/admin';
import PrivateRoute from '../components/PrivateRoute';

const Router = () =>{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginScreen/>} />
            <Route path="/home" element={<HomeScreen/>} />
            {/* Use PrivateRoute to protect routes */}
            <Route userType="admin" path="/admin" element={<AdminScreen />} />
            <Route path="/detail" element={<DetailScreen/>} />
            <Route path="/shop" element={<CartScreen/>} />
            <Route path="/wishList" element={<WishListScreen/>} />
        </Routes>
                
        </BrowserRouter>
    )
}

export default Router;