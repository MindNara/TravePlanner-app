import { createSlice } from "@reduxjs/toolkit";

const tripsSlice = createSlice({
    name: 'trips',
    initialState: {
        trip_id: '',
        trips: [],
    },
    reducers: {
        tripId(state, action) {
            state.trip_id = action.payload;
            console.log(state.trip_id);
        },
        tripsReceived(state, action) {
            state.trips = action.payload;
            console.log(state.trips);
        },
    },
})

export const { tripId, tripsReceived } = tripsSlice.actions;
export const tripSelector = (store) => store.trips;
export default tripsSlice.reducer;