import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        wish_list: [],
    },
    reducers: {
        wishList(state, action) {
            state.wish_list = action.payload;
            // console.log(state.trip_id);
        },
    },
})


export const { wishList } = wishlistSlice.actions;
export const wishlistSelector = (store) => store.wishlist;
export default wishlistSlice.reducer;
