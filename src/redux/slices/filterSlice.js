import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId:0,
    courentPage:1,
    sort:{
        name:'популярности',
        sortProperty: 'rating',
    },
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSort(state, action) {
            state.sort = action.payload
        },
        setCourentPage(state, action) {
            state.courentPage = action.payload
        },
        setFilters(state, action) {
            state.courentPage = Number(action.payload.courentPage);
            state.sort = action.payload.sort;
            state.categoryId = Number(action.payload.categoryId);
        },
    }
})


export default filterSlice.reducer
export const {setCategoryId , setSort, setCourentPage, setFilters} = filterSlice.actions