import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/api';

function AdminDashboard({ name }) {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      const users = await getUser();
      setUserCount(users.length);
    };

    fetchUserCount();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome, {name}!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">User Management</h2>
          <p>Manage system users here</p>
          <Link to="/admin/users" className="text-blue-500 hover:underline">Go to User Management</Link>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">User Amount</h2>
          <p>Total Users: {userCount}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Distribution Overview</h2>
          <p>View distribution statistics</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
