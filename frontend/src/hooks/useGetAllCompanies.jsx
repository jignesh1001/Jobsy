import  { useEffect } from 'react'
import axios from 'axios' 
import { COMPANY_API_END_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setAllCompanies } from '@/redux/companySlice'
 const useGetAllCompanies = () => {
    const dispatch = useDispatch()
  useEffect(()=>{
    const fetchCompanies = async () => {
        try{
           const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true})
           
           if(res.data.success){
              dispatch(setAllCompanies(res.data.companies))
           }
           if(res.data.success){
            //  console.log(res.data)
           }
        }catch(error){
           console.log(error)
        }
    }
    fetchCompanies();

  },[])
}


export default useGetAllCompanies;
