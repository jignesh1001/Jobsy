import { useEffect } from 'react'
import axios from 'axios'
import { JOB_API_END_POINT } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs, setLoading } from '@/redux/jobSlice'

const useGetAllJobs = () => {
    const dispatch = useDispatch()
    const { searchedQuery } = useSelector(state => state.job)

    useEffect(() => {
        const fetchAllJobs = async () => {
            dispatch(setLoading(true))
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs))
                }
            } catch (error) {
                console.error(error)
            } finally {
                dispatch(setLoading(false))
            }
        }
        fetchAllJobs()
    }, [searchedQuery, dispatch])
}

export default useGetAllJobs