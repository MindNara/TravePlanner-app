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
        deletePlaces(state, action) {
            const placeIdToDelete = action.payload;
            state.places = state.places.filter(place => place.id !== placeIdToDelete);
            console.log("Delete place complate");
        },
    },
})

export const { placesReceived, deletePlaces } = placesSlice.actions;
export const placeSelector = (store) => store.places;
export default placesSlice.reducer;