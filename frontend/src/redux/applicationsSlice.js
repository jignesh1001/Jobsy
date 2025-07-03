
import { createSlice } from "@reduxjs/toolkit";

const applicationsSlice = createSlice({  

    name: "applications",
    initialState: {
        applications:[],

    },
    reducers:{
        //actions
        setApplications:(state,action)=>{
            state.applications = action.payload
        },
        // setUser:(state,action)=>{
        //     state.user = action.payload
        // }
 
    }
})

export const {setApplications} = applicationsSlice.actions;
export default applicationsSlice.reducer;