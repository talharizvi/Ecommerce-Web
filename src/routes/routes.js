import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from '../screens/Home';
import DetailScreen from '../screens/Detail';
import CartScreen from '../screens/Cart';
import WishListScreen from '../screens/Wishlist';
import LoginScreen from '../screens/Login';
import AdminScreen from '../screens/admin';
import PrivateRoute from '../components/PrivateRoute';
import Products from '../screens/Products';
import AddProduct from '../screens/AddProduct';
import Profile from '../screens/Profile';

const Router = () =>{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginScreen/>} />
            <Route path="/home" element={<PrivateRoute><HomeScreen/></PrivateRoute>} />
            
            <Route path="/admin/*" element={<PrivateRoute userRole='admin'><AdminScreen /></PrivateRoute>} >
                <Route path="products" element={
                <PrivateRoute userRole='admin'>
                    <Products />
                </PrivateRoute>
                
                } initial/>
                <Route path="add-product" element={ <PrivateRoute userRole='admin'><AddProduct /></PrivateRoute>} />
                <Route path="profile" element={<PrivateRoute userRole='admin'><Profile /></PrivateRoute>} />
            </Route>

            <Route path="/detail" element={<PrivateRoute><DetailScreen/></PrivateRoute>} />
            <Route path="/shop" element={<PrivateRoute><CartScreen/></PrivateRoute>} />
            <Route path="/wishList" element={<PrivateRoute><WishListScreen/></PrivateRoute>} />
        </Routes>
                
        </BrowserRouter>
    )
}

export default Router;