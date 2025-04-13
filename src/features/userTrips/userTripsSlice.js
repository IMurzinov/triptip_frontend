import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    trips: null,
    totalCount: null,
};

const userTripsSlice = createSlice({
    name: 'userTrips',
    initialState,
    reducers: {
        tripsAdd(state, action) {
            state.trips = action.payload.trips;
            state.totalCount = action.payload.totalCount;
        },
        cleanUserTrips(state) {
            state.trips = null;
            state.totalCount = null;
        },
    }
});

export const { tripsAdd, cleanUserTrips } = userTripsSlice.actions;

export default userTripsSlice.reducer;