import { createSlice } from "@reduxjs/toolkit";

const placesSlice = createSlice({
    name: 'places',
    initialState: {
        places: [],
    },
    reducers: {
        placesReceived(state, action) {
            state.places = action.payload;
            // console.log(state.places);
        },
    },
})

export const { placesReceived } = placesSlice.actions;
export const placeSelector = (store) => store.places;
export default placesSlice.reducer;