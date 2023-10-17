import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        user_id: '',
        user_info: []

    },
    reducers: {
        usersId(state, action) {
            state.user_id = action.payload;
            console.log('User ID: ' + state.user_id);
        },
        usersInfo(state, action){
            state.user_info = action.payload;
            console.log('userInfo: ' + state.user_info);
        }
    },
})

export const { usersId, usersInfo } = usersSlice.actions;
export const userSelector = (store) => store.users;
export default usersSlice.reducer;