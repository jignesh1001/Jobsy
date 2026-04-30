import { useEffect } from 'react'
import axios from 'axios'
import { JOB_API_END_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setAllAdminJobs, setLoading } from '@/redux/jobSlice'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            dispatch(setLoading(true))
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs))
                }
            } catch (error) {
                console.error(error)
            } finally {
                dispatch(setLoading(false))
            }
        }
        fetchAllAdminJobs()
    }, [dispatch])
}

export default useGetAllAdminJobs