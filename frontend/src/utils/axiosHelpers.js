import axios from 'axios';
import history from './browserHistory';

export const setAxiosConfig = () => {
  const baseURL = 'http://localhost:8000';
  axios.defaults.baseURL = baseURL;
  axios.interceptors.response.use(response => response, handleError);
}

export const setAuthorizationToken = () => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
}

const handleError = (error) => {
  if (error.response.status === 401) {
    history.push('/login');
  }
  return { data: { success: false } };
  // throw (error);
};
