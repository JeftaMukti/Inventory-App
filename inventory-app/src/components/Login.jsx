import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (err) {
      setError('Invalid credentials');
      console.error('Login error', err.response?.data);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <h2 className="text-2xl font-medium mb-6">Login</h2>
          {error && (
            <div className="text-red-500 text-sm mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="inline-block h-5 w-5 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M8.944 13.342A8.001 8.001 0 0 1 11.944 11.342V9.342M9 8.342V5l3 3m-3-4h12v8H5z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow-sm bg-gray-50 border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow-sm bg-gray-50 border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;