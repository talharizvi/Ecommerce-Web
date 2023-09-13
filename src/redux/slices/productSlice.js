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
            state.productItems.unshift({...action.payload})
        },
        removeProduct: (state, action) =>{
            console.log('payload', action)
            const existingProductIndex = state.productItems.findIndex(item => item.title === action.payload.title);

            if (existingProductIndex !== -1) {
                state.productItems.splice(existingProductIndex, 1);
            }
        },
        editProduct: (state, action) => {
            const editedProduct = action.payload;
            console.log('editedProduct', editedProduct)
            const index = state.productItems.findIndex(
                (product) => product.id === editedProduct.id
            );

            if (index !== -1) {
                // Replace the existing product with the edited one
                state.productItems[index] = editedProduct;
            }
        },
    }
})


export const selectProducts = state => state.productItems.productItems

export const {addProduct, removeProduct, editProduct} = productSlice.actions 
export default productSlice.reducer