import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        wish_list: [],
        status: 'none'
    },
    reducers: {
        wishListReceived(state, action) {
            state.wish_list = action.payload;
            // console.log(state.trip_id);
        },
        wishlistStatus(state, action) {
            if (state.status === 'none') {
                state.status = 'add';
                console.log('add');
            } else if (state.status === 'add') {
                state.status = 'none';
                console.log('none');
            }
        }
    },
})


export const { wishListReceived, wishlistStatus } = wishlistSlice.actions;
export const wishlistSelector = (store) => store.wishlist;
export default wishlistSlice.reducer;
