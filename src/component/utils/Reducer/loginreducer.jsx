import { createSlice } from "@reduxjs/toolkit";

export const LoginReducer = createSlice({
    name:"login",
    initialState:{
        token:" ",
        email:""
    },
    reducers:{
        storeToken:(state,action)=>{
            state.token=action.payload;
        },
        resetToken:(state,action)=>{
            state.token=action.payload;
        },
    setEmailState:(state,action)=>{
        state.email=action.payload
    },
    resetEmailState:(state,action)=>{
        state.type=action.payload
    }   
    }
})
export const {storeToken,resetToken,setEmailState,resetEmailState} = LoginReducer.actions;
export default LoginReducer.reducer;