import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (username: string, password: string) => {
  try {
    console.log('Attempting login with:', { username, password });
    const response = await api.post('/auth/login', {
      username,
      password,
    });
    
    console.log('Login response:', response.data);
    
    if (response.data.token) {
      await AsyncStorage.setItem('access_token', response.data.token);
      const userProfile = await getProfile();
      return { token: response.data.token, user: userProfile };
    }
    throw new Error('Login failed - No token received');
  } catch (error: any) {
    if (error.response) {
      console.error('Login error response:', {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers,
      });
    } else if (error.request) {
      console.error('Login error request:', error.request);
    } else {
      console.error('Login error message:', error.message);
    }
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get('/users/1');
    console.log('Profile response:', response.data);
    
    return {
      id: response.data.id,
      username: response.data.username,
      email: response.data.email,
      name: {
        firstname: response.data.name.firstname,
        lastname: response.data.name.lastname
      }
    };
  } catch (error) {
    console.error('Get profile error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('access_token');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export default api;
