import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    center:{
        lat: 34.0522,
        lng: -118.2437
    },
    isSearching:false,
    destinationCoordinates: {
        gLat:null,
        gLng:null
    },
    isRouting: false,
    mapZoomLevel: 16
}

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        updateMapCenter: (state, action) => {
            state.center = action.payload
        },
        setIsSearching: (state) => {
            state.isSearching = true
        },
        resetSearching: (state) => {
            state.isSearching = false
        },
        setDestinationCoordinates: (state, action) => {
            state.destinationCoordinates = action.payload
        },
        setIsRouting: (state) => {
            state.isRouting = true
        },
        resetRouting: (state) => {
            state.isRouting = false
        },
    }
})

export const { updateMapCenter, setIsSearching, resetSearching, setDestinationCoordinates, setIsRouting, resetRouting } = mapSlice.actions;

export default  mapSlice.reducer;