import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    wishListedItems: [],
}

export const wishlistSlice = createSlice({
    name:'wishlistItems',
    initialState,
    reducers:{
        addItemToWishlist:(state,action)=>{
            //state.wishListedItems.push({...action.payload, isWishlist: true})
        },
        toggleWishlist: (state, action) =>{
            console.log('payload', action)
            const itemIndex = state.wishListedItems.findIndex(item => item.title === action.payload.title);
            if (itemIndex !== -1) {
                state.wishListedItems.splice(itemIndex, 1);
            } else {
                state.wishListedItems.push(action.payload)
            }
        },
    }
})


export const selectWishList = state => state.wishlistItems.wishListedItems

export const {addItemToWishlist, toggleWishlist} = wishlistSlice.actions 
export default wishlistSlice.reducer