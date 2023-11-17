import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";
import tripsSlice from "./tripsSlice";
import schedulesSlice from "./schedulesSlice";
import placesSlice from "./placesSlice";
import wishlistSlice from "./wishlistSlice";

const store = configureStore({
    reducer: {
        users: usersSlice,
        trips: tripsSlice,
        schedules: schedulesSlice,
        places: placesSlice,
        wishlist: wishlistSlice,
    },
});

export default store;