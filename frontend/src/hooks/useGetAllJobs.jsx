import  { useEffect } from 'react'
import axios from 'axios'
import { JOB_API_END_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setAllJobs } from '@/redux/jobSlice'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
const useGetAllJobs = () => {
    const dispatch = useDispatch()
    const {searchedQuery} = useSelector(state => state.job)
  useEffect(()=>{
    const fetchAllJobs = async () => {
        try{
           const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true})
           
           if(res.data.success){
              dispatch(setAllJobs(res.data.jobs))
           }
           if(res.data.success){
             console.log(res.data)
           }
        }catch(error){
           console.log(error)
           
        }
    }
    fetchAllJobs();

  },[])
}

export default useGetAllJobs;