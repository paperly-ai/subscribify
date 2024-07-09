import axios from 'axios';
import { SERVER_URL } from './config';

export const loginUser = async (email: string, password: string) => {
  try {
    const loginEndpoint = `${SERVER_URL}/api/auth/login`;
    const loginData = {
      email: email,
      password: password
    };


    const response = await axios.post(loginEndpoint, loginData);
    console.log(response.data);

    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return true;
  } catch (error) {
    throw error;
  }
};
