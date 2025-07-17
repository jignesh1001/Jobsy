
import  { useEffect } from 'react'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationsSlice'
export const useGetAllApplicants = (id) => {
    const dispatch = useDispatch()
  useEffect(()=>{
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${id}/applicants`,
          { withCredentials: true }
        );
        console.log(res.data);
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();

  },[])
}

