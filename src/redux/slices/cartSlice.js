import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice:0,
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(obj => obj.title === action.payload.title);
            if (findItem) {
                findItem.count++;
            }else{
                state.items.push({...action.payload, count: 1});
            }
            state.totalPrice = state.items.reduce((sum,obj)=>{
                return obj.price * obj.count + sum;
            },0);
        },
        minusItem(state, action) {
            const findItem = state.items.find(obj => obj.title === action.payload.title);
            if(findItem.count > 1 ){
                findItem.count--;
            } else if(findItem.count === 1 ){
                state.items = state.items.filter((obj) => obj.title !== action.payload.title);
            }
            state.totalPrice = state.items.reduce((sum,obj)=>{
                return obj.price * obj.count + sum;
            },0);

        },
        clearItems(state, action) {
            state.items = [];
            state.totalPrice = 0;
        },
        removeItem(state, action) {
            state.items = state.items.filter((obj) => obj.title !== action.payload.title);
            state.totalPrice = state.items.reduce((sum,obj)=>{
                return obj.price * obj.count + sum;
            },0);
        },
    }

})


export default cartSlice.reducer
export const {addItem,  clearItems, minusItem, removeItem} = cartSlice.actions