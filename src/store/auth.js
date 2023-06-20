import { createSlice } from "@reduxjs/toolkit"
const initialAuthState={
    isAuthenticated:false,
    ispremium:false,
    isdarkToggle:false
}

const authSlice=createSlice({
    name:"authentication",
    initialState: initialAuthState,
    reducers:{
        login(state,action){
            state.isAuthenticated=true
            localStorage.setItem("token",action.payload)
        },
        logout(state){
            state.isAuthenticated=false
            localStorage.removeItem("token")
        },
        ispremium(state,action){
            if(action.payload>1000){
                state.ispremium=true
            }else{
                state.ispremium=false
            }
        },
        darkToggle(state){
            state.isdarkToggle=true
        }
    }
})



export const authActions=authSlice.actions;
export default authSlice.reducer;