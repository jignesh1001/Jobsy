
import { createSlice } from "@reduxjs/toolkit";

const applicationsSlice = createSlice({  

    name: "applications",
    initialState: {
        applications:[],
        applicants:[]
    },
    reducers:{
        //actions
        setApplications:(state,action)=>{
            state.applications = action.payload
        },
        // setUser:(state,action)=>{
        //     state.user = action.payload
        // }
        setAllApplicants:(state,action)=>{
            state.applicants = action.payload
        }
 
    }
})

export const {setApplications,setAllApplicants} = applicationsSlice.actions;
export default applicationsSlice.reducer;