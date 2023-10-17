import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        user_id: '',
    },
    reducers: {
        usersId(state, action) {
            state.user_id = action.payload;
            // console.log('User ID: ' + state.user_id);
        },
    },
})

export const { usersId } = usersSlice.actions;
export const userSelector = (store) => store.users;
export default usersSlice.reducer;