import axios from 'axios';

export const getComments = () => axios.get('/api/v1/comments');

export const addComment = data => axios.post('/api/v1/comments', data);

export const editComment = (id, data) => axios.put(`/api/v1/comments/${id}`, data);