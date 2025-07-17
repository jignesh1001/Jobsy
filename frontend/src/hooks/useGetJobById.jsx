import  { useEffect } from 'react'
import axios from 'axios'
import {   JOB_API_END_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setSingleJob } from '@/redux/jobSlice'
const useGetJobById = (jobId) => {
    const dispatch = useDispatch()
  useEffect(()=>{
    const fetchSingleJob = async () => {
        try{
           const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true})
           
           if(res.data.success){
              dispatch(setSingleJob(res.data.job))
           }
           if(res.data.success){
             console.log(res.data)
           }

           
        }catch(error){
           console.log(error)
        }
    }
    fetchSingleJob();

  },[jobId,dispatch])
}

export default useGetJobById;