import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import applicationsSlice from "./applicationsSlice";
const store = configureStore({
     reducer: {
       auth : authSlice,
       job : jobSlice,
       applications : applicationsSlice
     } 
    
    });

export default store;