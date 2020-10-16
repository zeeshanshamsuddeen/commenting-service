import axios from 'axios';
import { setAuthorizationToken } from '../utils/axiosHelpers';

const saveUserToken = (token) => {
  localStorage.setItem('token', token);
};

const saveUserID = (userID) => {
  localStorage.setItem('userID', userID);
};

export const getUserID = () => localStorage.getItem('userID');

export const userLogin = async (data) => {
  const response = await axios.post('/api/v1/accounts/login', data);
  if (response.data.success) {
    saveUserToken(response.data.token);
    saveUserID(response.data.userID);
    setAuthorizationToken();
  }
  return response;
}

export const userLogout = () => {
  localStorage.removeItem('userID');
  localStorage.removeItem('token');
}