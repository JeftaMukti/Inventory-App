import React, { useState, useEffect } from 'react';
import { getStation, createStation, updateStation, deleteStation } from '../services/api'; // Assuming these are your API functions
import SidebarComponent from '../components/Sidebar';
import Alert from '../components/Alert';

function StationManagement() {
  const [stations, setStations] = useState([]);
  const [newStation, setNewStation] = useState({ name: '', location: '', manager: '' });
  const [editingStation, setEditingStation] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  const userRole = 'distribusi'; // Example role, replace as needed
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login'; 
  };

  useEffect(() => {
    const fetchStations = async () => {
      setLoading(true);
      try {
        const stations = await getStation(); // Make sure this function works
        console.log('Fetched stations:', stations); // Debugging line
        setStations(stations);
      } catch (error) {
        console.error('Error fetching stations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  const handleCreateStation = async () => {
    try {
      const station = await createStation(newStation);
      console.log('Created station:', station); // Debugging line
      if (station) {
        setStations([...stations, station]);
        setNewStation({ name: '', location: '', manager: '' });
        setShowCreateModal(false);
        setAlert({ show: true, message: 'Station created successfully!', type: 'success' });
      }
    } catch (error) {
      console.error('Error creating station:', error);
    }
  };

  const handleUpdateStation = async () => {
    try {
      const updatedStation = await updateStation(editingStation.id, editingStation);
      console.log('Updated station:', updatedStation); // Debugging line
      if (updatedStation) {
        setStations(stations.map(s => s.id === editingStation.id ? updatedStation : s));
        setEditingStation(null);
        setShowEditModal(false);
        setAlert({ show: true, message: 'Station updated successfully!', type: 'success' });
      }
    } catch (error) {
      console.error('Error updating station:', error);
    }
  };

  const handleDeleteStation = async (id) => {
    if (window.confirm('Are you sure you want to delete this station?')) {
      try {
        await deleteStation(id);
        setStations(stations.filter(station => station.id !== id));
        setAlert({ show: true, message: 'Station deleted successfully!', type: 'success' });
      } catch (error) {
        console.error('Error deleting station:', error);
      }
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
        <h1 className="text-3xl font-bold mb-4">Station Management</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4"
        >
          Create New Station
        </button>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Existing Stations</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border-b">No</th>
                <th className="p-2 border-b">Name</th>
                <th className="p-2 border-b">Location</th>
                <th className="p-2 border-b">Manager</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stations.map((station, index) => (
                <tr key={station.id} className="hover:bg-gray-50">
                  <td className="p-2 border-b">{index + 1}</td>
                  <td className="p-2 border-b">{station.name}</td>
                  <td className="p-2 border-b">{station.location}</td>
                  <td className="p-2 border-b">{station.manager}</td>
                  <td className="p-2 border-b">
                    <button
                      onClick={() => { setEditingStation(station); setShowEditModal(true); }}
                      className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteStation(station.id)}
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

        {/* Create Station Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4">Create New Station</h2>
              <label className="block mb-2">
                <span className="text-gray-700">Name</span>
                <input
                  type="text"
                  placeholder="Name"
                  value={newStation.name}
                  onChange={(e) => setNewStation({ ...newStation, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
              <label className="block mb-2">
                <span className="text-gray-700">Location</span>
                <input
                  type="text"
                  placeholder="Location"
                  value={newStation.location}
                  onChange={(e) => setNewStation({ ...newStation, location: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
              <label className="block mb-2">
                <span className="text-gray-700">Manager</span>
                <input
                  type="text"
                  placeholder="Manager"
                  value={newStation.manager}
                  onChange={(e) => setNewStation({ ...newStation, manager: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
              <div className="flex justify-between">
                <button
                  onClick={handleCreateStation}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Create Station
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

        {/* Edit Station Modal */}
        {showEditModal && editingStation && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4">Edit Station</h2>
              <label className="block mb-2">
                <span className="text-gray-700">Name</span>
                <input
                  type="text"
                  placeholder="Name"
                  value={editingStation.name}
                  onChange={(e) => setEditingStation({ ...editingStation, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
              <label className="block mb-2">
                <span className="text-gray-700">Location</span>
                <input
                  type="text"
                  placeholder="Location"
                  value={editingStation.location}
                  onChange={(e) => setEditingStation({ ...editingStation, location: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
              <label className="block mb-2">
                <span className="text-gray-700">Manager</span>
                <input
                  type="text"
                  placeholder="Manager"
                  value={editingStation.manager}
                  onChange={(e) => setEditingStation({ ...editingStation, manager: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
              <div className="flex justify-between">
                <button
                  onClick={handleUpdateStation}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Update Station
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
            type={alert.type}
            onClose={closeAlert}
          />
        )}
      </div>
    </div>
  );
}

export default StationManagement;
