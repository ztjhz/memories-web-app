import axios from 'axios';

const baseUrl = 'https://jh-memories-project.herokuapp.com';
// const baseUrl = 'http://localhost:5000';
const url = `${baseUrl}/posts`;

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const login = (user) => axios.post(`${baseUrl}/login`, user);
