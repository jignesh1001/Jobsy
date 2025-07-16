import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const useClearQueryOnRouteChange = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchedQuery(''));
  }, [location.pathname]);
};

export default useClearQueryOnRouteChange;
