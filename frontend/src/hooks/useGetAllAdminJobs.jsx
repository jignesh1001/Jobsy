import  { useEffect } from 'react'
import axios from 'axios'
import { JOB_API_END_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setAllAdminJobs } from '@/redux/jobSlice'
const useGetAllAdminJobs = () => {
    const dispatch = useDispatch()
  useEffect(()=>{
    const fetchAllAdminJobs = async () => {
        try{
           const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true})
           
           if(res.data.success){
              dispatch(setAllAdminJobs(res.data.jobs))
           }
           if(res.data.success){
             console.log(res.data)
           }
        }catch(error){
           console.log(error)
        }
    }
    fetchAllAdminJobs();

  },[])
}

export default useGetAllAdminJobs;