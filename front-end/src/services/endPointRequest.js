import axios from 'axios';

const endpointRequest = axios.create({ url: 'http://localhost:3001' });

export const signLogin = async (endpoint, body) => {
  const { data } = await endpointRequest.post(endpoint, body);
  return data;
};

export const getAllProducts = async (endpoint) => {
  const { data } = await endpointRequest.get(endpoint);
  return data;
};

export default endpointRequest;
