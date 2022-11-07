import axios from "axios";

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 10000,
  headers: {
    "content-type": "application/json",
  },
});

export const get = async (path, options = {}) => {
  const response = await request.get(path, options);
  return response.data;
};

export const post = async (path, options = {}) => {
  const response = await request.post(path, options);
  return response.data;
};

export const patch = async (path, options = {}) => {
  const response = await request.patch(path, options);
  return response.data;
};

export const _delete = async (path) => {
  await request.delete(path);
};

export default request;
