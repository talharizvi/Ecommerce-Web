//the Redux logic for the cart feature

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItemList: [],
}

export const cartSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        // addItemToCart: (state, action) =>{
        //     console.log('state', state, 'action', action)
        //     state.cartItemList.push({...action.payload, isWishlist: false})
        // },
        addItemToCart: (state, action) => {
            const { id, quantity=1 } = action.payload;
            const existingItem = state.cartItemList.find(item => item.id === id);
      
            if (existingItem) {
              // If the item already exists, update its quantity
              existingItem.quantity += quantity;
            } else {
              // If the item doesn't exist, add it to the cart with quantity
              state.cartItemList.push({ ...action.payload, isWishlist: false, quantity:1 });
            }
          },
          changeCartItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.cartItemList.find(item => item.id === id);
      
            if (existingItem) {
              // Change the quantity of the specific item
              existingItem.quantity = quantity;
            }
            state.cartItemList = state.cartItemList.map(item => {
                if (item.id === id) {
                  return { ...item, quantity }; // Create a new object with updated quantity
                }
                return item; // Keep other items unchanged
              });
          },

          removeCartItem: (state, action) => {
            const itemIndex = state.cartItemList.findIndex(item => item.id === action.payload.id);
            state.cartItemList.splice(itemIndex, 1)
          },

        resetCartItems: (state, action) =>{
            state.cartItemList = []
        }
    }
})


export const selectCartItems = state => state.cartItems.cartItemList

export const {addItemToCart, resetCartItems, changeCartItemQuantity, removeCartItem} = cartSlice.actions
export default cartSlice.reducer