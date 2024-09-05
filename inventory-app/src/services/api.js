import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export const getUserDetails = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching user details', error);
    return null;
  }
};

export const getUser = async () => {
  try {
    const response = await api.get('/account');
    return response.data;
  } catch (error) {
    return [error]
  }
}

export const createUser = async (userData) => {
  try {
    const response = await api.post('/create-account', {
      ...userData,
      password_confirmation: userData.password // Add this field to match the password
    });
    return response.data.user;
  } catch (error) {
    console.error('Error creating user', error.response?.data || error.message);
    return null;
  }
};



export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/update-account/${id}`, userData);
    return response.data.user;
  } catch (error) {
    console.error('Error updating user', error);
    return null;
  }
};

export const deleteUser = async (id) => {
  try {
    await api.delete(`/delete-account/${id}`);
  } catch (error) {
    console.error('Error deleting user', error);
  }
};

export default api;