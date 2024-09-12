import React, { useState, useEffect } from 'react';
import { getUser, createUser, updateUser, deleteUser } from '../services/api';
import SidebarComponent from '../components/Sidebar';
import Alert from '../components/Alert';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'admin' });
  const [editingUser, setEditingUser] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  const userRole = 'admin'; 
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login'; 
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Start loading
      try {
        const users = await getUser();
        setUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    const user = await createUser(newUser);
    if (user) {
      setUsers([...users, user]);
      setNewUser({ name: '', email: '', password: '', role: 'admin' });
      setShowCreateModal(false);
      setAlert({ show: true, message: 'User created successfully!', type: 'success' });
    }
  };

  const handleUpdateUser = async () => {
    const updatedUser = await updateUser(editingUser.id, editingUser);
    if (updatedUser) {
      setUsers(users.map(u => u.id === editingUser.id ? updatedUser : u));
      setEditingUser(null);
      setShowEditModal(false);
      setAlert({ show: true, message: 'User updated successfully!', type: 'success' });
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
      setAlert({ show: true, message: 'User deleted successfully!', type: 'success' });
    }
  };

  const closeAlert = () => {
    setAlert({ ...alert, show: false });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarComponent role={userRole} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-4">User Management</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4"
        >
          Create New User
        </button>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Existing Users</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border-b">No</th>
                <th className="p-2 border-b">Name</th>
                <th className="p-2 border-b">Email</th>
                <th className="p-2 border-b">Role</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-2 border-b">{index + 1}</td>
                  <td className="p-2 border-b">{user.name}</td>
                  <td className="p-2 border-b">{user.email}</td>
                  <td className="p-2 border-b">{user.role}</td>
                  <td className="p-2 border-b">
                    <button
                      onClick={() => { setEditingUser(user); setShowEditModal(true); }}
                      className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Create User Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4">Create New User</h2>
              <label className="block mb-2">
                <span className="text-gray-700">Name</span>
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
              <label className="block mb-2">
                <span className="text-gray-700">Email</span>
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
              <label className="block mb-2">
                <span className="text-gray-700">Password</span>
                <input
                  type="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
              <label className="block mb-4">
                <span className="text-gray-700">Role</span>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="admin">Admin</option>
                  <option value="purchase">Purchase</option>
                  <option value="distribusi">Distribusi</option>
                </select>
              </label>
              <div className="flex justify-between">
                <button
                  onClick={handleCreateUser}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Create User
                </button>
                <button
                     onClick={() => setShowCreateModal(false)}
                     className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400"
                   >
                     Cancel
                   </button>
                 </div>
               </div>
             </div>
           )}

           {/* Edit User Modal */}
           {showEditModal && editingUser && (
             <div className="fixed inset-0 flex items-center justify-center z-50">
               <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                 <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
                 <label className="block mb-2">
                   <span className="text-gray-700">Name</span>
                   <input
                     type="text"
                     value={editingUser.name}
                     onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                     className="w-full p-2 border border-gray-300 rounded-md"
                   />
                 </label>
                 <label className="block mb-2">
                   <span className="text-gray-700">Email</span>
                   <input
                     type="email"
                     value={editingUser.email}
                     onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                     className="w-full p-2 border border-gray-300 rounded-md"
                   />
                 </label>
                 <label className="block mb-2">
                   <span className="text-gray-700">Password</span>
                   <input
                     type="password"
                     value={editingUser.password}
                     onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                     className="w-full p-2 border border-gray-300 rounded-md"
                   />
                 </label>
                 <label className="block mb-4">
                   <span className="text-gray-700">Role</span>
                   <select
                     value={editingUser.role}
                     onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                     className="w-full p-2 border border-gray-300 rounded-md"
                   >
                     <option value="admin">Admin</option>
                     <option value="purchase">Purchase</option>
                     <option value="distribusi">Distribusi</option>
                   </select>
                 </label>
                 <div className="flex justify-between">
                   <button
                     onClick={handleUpdateUser}
                     className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                   >
                     Update User
                   </button>
                   <button
                     onClick={() => setShowEditModal(false)}
                     className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400"
                   >
                     Cancel
                   </button>
                 </div>
               </div>
             </div>
           )}

           {/* Alert */}
           {alert.show && (
             <Alert 
               message={alert.message} 
               onClose={closeAlert} 
             />
           )}
         </div>
       </div>
     );
   }

   export default UserManagement;

