import axios from 'axios';

const endpointRequest = axios.create({ baseURL: 'http://localhost:3001' });

export const signLogin = async (endpoint, body) => {
  const { data } = await endpointRequest.post(endpoint, body);
  return data;
};

export default endpointRequest;
