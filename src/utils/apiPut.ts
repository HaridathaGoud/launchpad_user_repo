import axios from 'axios';
import { getToken } from './api';
const API_END_POINT = process.env.REACT_APP_API_MINTING_END_POINT;
const API_VERSION = 'api/v1/';
async function put(url: any, obj: any) {
  const token = getToken();
  return await axios.put(`${API_END_POINT}${API_VERSION}${url}`, obj,{
    headers:{
      Authorization:`${token}`
    }
  });
}
export { put };