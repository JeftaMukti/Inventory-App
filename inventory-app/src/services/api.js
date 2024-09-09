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

// Account
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
      password_confirmation: userData.password
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

// Station
export const getStation = async () => {
  try {
    const response = await api.get('/station');
    console.log('Fetched stations:', response.data); // Debugging line
    return response.data;
  } catch (error) {
    console.error('Error fetching stations:', error.response ? error.response.data : error.message);
    return [error];
  }
}

export const createStation = async (stationData) => {
  try {
    const response = await api.post('/station', stationData);
    console.log('Created station:', response.data.data); // Debugging line
    return response.data.station;
  } catch (error) {
    console.error('Error creating station:', error.response ? error.response.data : error.message);
    return null;
  }
};

export const updateStation = async (id, stationData) => {
  try {
    const response = await api.put(`/station/${id}`, stationData);
    console.log('Updated station:', response.data.data); // Debugging line
    return response.data.station;
  } catch (error) {
    console.error('Error updating station:', error.response ? error.response.data : error.message);
    return null;
  }
};

export const deleteStation = async (id) => {
  try {
    await api.delete(`/station/${id}`);
    console.log('Deleted station:', id); // Debugging line
  } catch (error) {
    console.error('Error deleting station:', error.response ? error.response.data : error.message);
  }
};

// Supplier
export const getSupplier = async () => {
  try {
    const response = await api.get('/supplier');
    console.log('Fetched suppliers:', response.data); // Debugging line
    return response.data;
  } catch (error) {
    console.error('Error fetching stations:', error.response ? error.response.data : error.message);
    return [error];
  }
}

export const createSupplier = async (newSupplier) => {
  try {
    const response = await api.post('/supplier', newSupplier);
    console.log('Full API response:', response); // Log the full response
    return response.data;  // Ensure the correct part of the response is returned
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};


export const updateSupplier = async (id, supplierData) => {
  try {
    const response = await api.put(`/supplier/${id}`, supplierData);
    console.log('Updated supplier:', response.data); // Debugging line
    return response.data;
  } catch (error) {
    console.error('Error updating supplier:', error.response ? error.response.data : error.message);
    return null;
  }
};

export const deleteSupplier = async (id) => {
  try {
    await api.delete(`/supplier/${id}`);
    console.log('Deleted supplier:', id); // Debugging line
  } catch (error) {
    console.error('Error deleting supplier:', error.response ? error.response.data : error.message);
  }
};
export default api;