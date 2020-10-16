import axios from 'axios';

export const getComments = (level = 1) => {
  const queryString = `level=${level}`;
  return axios.get(`/api/v1/comments?${queryString}`);
}

export const addComment = data => axios.post('/api/v1/comments', data);

export const editComment = (id, data) => axios.put(`/api/v1/comments/${id}`, data);