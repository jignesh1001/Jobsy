import { useEffect } from 'react'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setApplications } from '@/redux/applicationsSlice'

export const useGetApplications = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setApplications(res.data.applications))
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchApplications()
    }, [])
}

