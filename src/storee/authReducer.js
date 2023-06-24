import { createSlice } from "@reduxjs/toolkit";

const initialAuthState={isAuthenticated : false
    ,isPremium: false,
    darkToggle:false }

const authSlice=createSlice({
  name :'authentication',
  initialState:initialAuthState,
  reducers:{
    islogin(state,action){
      state.isAuthenticated=true;
      localStorage.setItem('token',action.payload)
    },
    islogout(state){
      state.isAuthenticated=false;
      state.isPremium = false;
      localStorage.removeItem('token');
    },
    isPremium(state,action){
        if (action.payload > 1000 ) {
            state.isPremium = true;
          } else {
            state.isPremium = false;
          }
    },isToggle(state){
        state.darkToggle=true;
     }
  }
})
export const authActions=authSlice.actions;
export default authSlice.reducer;