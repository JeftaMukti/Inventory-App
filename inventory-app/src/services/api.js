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
    console.log('Full API response:', response);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.error('Validation error response:', error.response.data.errors);
    } else {
      console.error('API error:', error);
    }
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

//Product 
export const getProduct = async () => {
  try {
    const response = await api.get('/product');
    console.log('fetched Products:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error.response ? error.response.data : error.message);
    return [error];
  }
}

export const createProduct = async (newProduct) => {
  try {
    const response = await api.post('/product-create', newProduct);
    console.log('Create Product:', response.data);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}

export const updateProduct = async (id, productdata) => {
  try {
    const response = await api.put(`/product-update/${id}`, productdata);
    console.log('Product Updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating supplier:', error.response ? error.response.data : error.message);
    return null;
  }
}

export const deleteProduct = async (id) => {
  try {
    await api.delete(`/product-delete/${id}`);
    console.log('product data has been deleted:', id);
  } catch (error) {
    console.error('Error deleting supplier:', error.response ? error.response.data : error.message);
  }
}

// Purchase
export const getPurchase = async () => {
  try {
    const response = await api.get('/purchase');
    console.log('fetched Purchase:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching purchase:', error.response ? error.response.data : error.message);
    return [error];
  }
}

export const createPurchase = async (newPurchase) => {
  try {
    const response = await api.post('/purchase', newPurchase);
    console.log('Create Purchase:', response.data);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}

export const deletePurchase = async (id) => {
  try {
    await api.delete(`/purchase/${id}`);
    console.log('purchase data has been deleted:', id);
  } catch (error) {
    console.error('Error deleting supplier:', error.response ? error.response.data : error.message);
  }
}

// Distribution
export const getDistribusi = async () => {
  try {
    const response = await api.get('/distribution');
    console.log('fetched Distribution:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching purchase:', error.response ? error.response.data : error.message);
    return [error];
  }
}

export const createDistribusi = async (newDistribusi) => {
  try {
    const response = await api.post('/distribution', newDistribusi);
    console.log('Create Distribution:', response.data);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}

export const deleteDistribusi = async (id) => {
  try {
    await api.delete(`/distribution/${id}`);
    console.log('distribution data has been deleted:', id);
  } catch (error) {
    console.error('Error deleting distribution:', error.response ? error.response.data : error.message);
  }
}
export default api;