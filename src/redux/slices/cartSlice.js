//the Redux logic for the cart feature

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItemList: [],
}

export const cartSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        addItemToCart: (state, action) =>{
            console.log('state', state, 'action', action)
            state.cartItemList.push({...action.payload, isWishlist: false})
        },
        resetCartItems: (state, action) =>{
            console.log('state', state, 'action', action)
            state.cartItemList = []
        }
    }
})


export const selectCartItems = state => state.cartItems.cartItemList

export const {addItemToCart, resetCartItems} = cartSlice.actions
export default cartSlice.reducer