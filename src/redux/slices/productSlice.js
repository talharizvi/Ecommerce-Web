import { createSlice } from '@reduxjs/toolkit';
import productsDataList from '../../constant';

const initialState = {
    productItems: productsDataList,
}

export const productSlice = createSlice({
    name:'productItems',
    initialState,
    reducers:{
        addProduct:(state,action)=>{
            state.productItems.push({...action.payload})
        },
        removeProduct: (state, action) =>{
            console.log('payload', action)
            const existingProductIndex = state.productItems.findIndex(item => item.title === action.payload.title);

            if (existingProductIndex !== -1) {
                state.productItems.splice(existingProductIndex, 1);
            }
        },
    }
})


export const selectProducts = state => state.productItems.productItems

export const {addProduct, removeProduct} = productSlice.actions 
export default productSlice.reducer