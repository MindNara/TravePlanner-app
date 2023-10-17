import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        user_id: '',
        user_info: [],
        loading: 'not login',
    },
    reducers: {
        usersId(state, action) {
            state.user_id = action.payload;
            console.log('User ID: ' + state.user_id);
        },
        usersLoading(state, action) {
            if (state.loading === 'not login') {
                state.loading = 'login success';
                console.log('login success');
            } else if (state.loading === 'login success') {
                state.loading = 'not login';
                console.log('not login');
            }
        },
        usersInfo(state, action) {
            if (state.loading === 'login success') {
                state.user_info = action.payload;
                console.log('UserInfo: ' + state.user_info);
            }
        }
    },
})

export const { usersId, usersInfo, usersLoading } = usersSlice.actions;
export const userSelector = (store) => store.users;
export default usersSlice.reducer;