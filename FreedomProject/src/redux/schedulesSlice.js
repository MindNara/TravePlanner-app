import { createSlice } from "@reduxjs/toolkit";

const schedulesSlice = createSlice({
    name: 'schedules',
    initialState: {
        schedules: [],
    },
    reducers: {
        scheduleReceived(state, action) {
            state.schedules = action.payload;
            // console.log(state.schedules);
        },
    },
})

export const { scheduleReceived } = schedulesSlice.actions;
export const scheduleSelector = (store) => store.schedules;
export default schedulesSlice.reducer;