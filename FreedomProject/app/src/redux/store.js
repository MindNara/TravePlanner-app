import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";
import tripsSlice from "./tripsSlice";

const store = configureStore({
    reducer: {
        users: usersSlice,
        trips: tripsSlice,
    },
});

export default store;