import { createSlice } from "@reduxjs/toolkit";

const initialPremium = {
  ispremium: false,
  isdarkToggle: false,
};

const premiumSlice = createSlice({
  name: "premium",
  initialState: initialPremium,
  reducers: {
    setPremium(state, action) {
      const premiumAmount = Number(action.payload); // Ensure the payload is a number
      state.ispremium = premiumAmount > 1000;

      if(premiumAmount>1000){
        state.ispremium=true;
      }
      else{
        state.ispremium=false;
      }
     
    },
    darkToggle(state) {
      state.isdarkToggle = true;
    },
    // logout(state) {
    //   // You can include logout functionality in the premiumSlice if desired
    //   state.ispremium = false;
    //   state.isdarkToggle = false;
    // },
  },
});

export const premiumActions = premiumSlice.actions;
export default premiumSlice.reducer;