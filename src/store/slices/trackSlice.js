import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tracking:false,
    saveBtn:false,
    currentTrip: {
        tripDate:null,
        startTime:null,
        endTime:null,
        distanceTravelled:0,
        coordinates: [],
    },
}

const trackSlice = createSlice({
    name: "track",
    initialState,
    reducers: {
        startTracking: (state, action) => {
            state.tracking = true
            state.currentTrip = {
                ...state.currentTrip,
                tripdate:action.payload.date,
                startTime:action.payload.startTime,                
            }
        },
        updateCoordinates: (state, action) => {
            if(state.tracking){
                state.currentTrip = {
                    ...state.currentTrip,
                    coordinates: [...state.currentTrip.coordinates, action.payload]
                }              
            }
        },
        stopTracking: (state, action) => {
            if(state.tracking){
                state.tracking = false,
                state.currentTrip = {
                    ...state.currentTrip,
                    endTime:action.payload.endTime,
                    distanceTravelled:action.payload.distanceTravelled
                }
                state.saveBtn = true;
            }
        },
        resetTrip: (state) => {
            state.currentTrip = initialState.currentTrip
            state.tracking = initialState.tracking
            state.saveBtn = initialState.saveBtn
        }
    }
})

export const {startTracking, updateCoordinates, stopTracking,resetTrip } = trackSlice.actions

export default trackSlice.reducer