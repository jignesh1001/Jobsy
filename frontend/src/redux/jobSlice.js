import { createSlice } from "@reduxjs/toolkit";


const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null,
        searchJobByText:"",
        searchedQuery:"",
        searchApplicantsByText:"",
        loading: false,
    },
    reducers:{
        setAllJobs:(state,action) =>{
            state.allJobs = action.payload
        },
        setSingleJob:(state,action) =>{
            state.singleJob = action.payload
        },
        setAllAdminJobs:(state,action) =>{
            state.allAdminJobs = action.payload
        },
        setSearchJobByText:(state,action) =>{
            state.searchJobByText = action.payload
        },
        setSearchedQuery:(state,action) =>{
            state.searchedQuery = action.payload
        },
        setSearchApplicantsByText:(state,action) =>{
            state.searchApplicantsByText = action.payload
        },
        setLoading:(state,action) =>{
            state.loading = action.payload
        }
    }

});

export const {setAllJobs,setSingleJob,setAllAdminJobs,setSearchJobByText,setSearchedQuery,setSearchApplicantsByText,setLoading} = jobSlice.actions;
export default jobSlice.reducer