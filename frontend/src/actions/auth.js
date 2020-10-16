import axios from 'axios';
import { setAuthorizationToken } from '../utils/axiosHelpers';

const saveUserToken = (token) => {
  localStorage.setItem('token', token);
};

export const userLogin = async (data) => {
  const response = await axios.post('/api/v1/accounts/login', data);
  if (response.data.success) {
    saveUserToken(response.data.token);
    setAuthorizationToken();
  }
  return response;
}
