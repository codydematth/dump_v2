import {api} from './api';

const createPost = (data: any) => {
  return api.post('posts/create', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
const getPosts = () => {
  return api.get('posts');
};
const postDetails = (id: any) => {
  return api.get(`posts/${id}`);
};
const deletePost = (id: any) => {
  return api.delete(`posts/delete/${id}`);
};
const updatePost = (id: any, data: any) => {
  return api.put(`posts/update/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const PostServices = {
  createPost,
  getPosts,
  postDetails,
  updatePost,
  deletePost,
};
