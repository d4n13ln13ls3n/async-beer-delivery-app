import axios from 'axios';

const endpointRequest = axios.create({
  baseURL: 'http://localhost:3001',
});

export const signLogin = async (endpoint, body) => {
  const { data } = await endpointRequest.post(endpoint, body);
  return data;
};

export const getAllProducts = async (endpoint) => {
  const { data } = await endpointRequest.get(endpoint);
  return data;
};

export const getData = async (endpoint) => {
  console.log();
  const { data } = await endpointRequest.get(endpoint);
  return data;
};

export const postData = async (endpoint, body, token) => {
  const { data } = await endpointRequest.post(endpoint, body, {
    headers: { Authorization: token },
  });
  return data;
};

export default endpointRequest;
