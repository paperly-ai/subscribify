import axios from 'axios';
import { SERVER_URL } from './config';
import toast from 'react-hot-toast';

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

export const createUser = async (username: string, email: string, password: string) => {
  try {
    const createUserEndpoint = `${SERVER_URL}/api/auth/signup`;
    const userData = {
      name: username,
      email: email,
      password: password
    };


    const response = await axios.post(createUserEndpoint, userData);
    console.log(response.data);
    toast.success("Accounted Created");

    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return true;
  } catch (error) {
    throw error;
  }
};
