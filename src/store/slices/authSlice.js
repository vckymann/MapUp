import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loggedInUserData: null,
    status: false,
    isNewUser: false,
    loggedInUserId: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state.status = true;
            state.loggedInUserData = action.payload
        },
        userLogout: (state) => {
            state.loggedInUserData = null
            state.status = false;
            state.loggedInUserId = null;            
        },
        getUserId: (state, action) => {
            state.loggedInUserId = action.payload.id
        },
        accountCreated: (state) => {
            state.isNewUser = true;
        },
        clearNewUser: (state) => {
            state.isNewUser = false  
        },
    }
})

export const { userLogin, userLogout, accountCreated, clearNewUser, sessionTimer, getUserId } = authSlice.actions;

export default authSlice.reducer;