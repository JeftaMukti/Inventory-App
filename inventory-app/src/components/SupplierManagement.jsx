import React, {useState, useEffect} from "react";
import { getSupplier, createSupplier, updateSupplier, deleteSupplier } from "../services/api";
import SidebarComponent from "./Sidebar";
import Alert from "./Alert";

function SupplierManagement() {
    const [suppliers, setSuppliers] = useState([]);
    const [newSupplier, setNewSupplier] = useState({name: '', email: '', phone: '', website: '', address: '', contact_person: ''});
    const [editingSupplier, setEditingSupplier] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });

    const userRole = 'purchase';
    const handleLogout = () => {
        localStorage.removeItem('authToken')
        window.location.href = '/login'
    }

    useEffect(() => {
        const fetchSuppliers = async () => {
            setLoading(true);
            try {
                const suppliers = await getSupplier();
                console.log('fetch Supplier:', suppliers)
                setSuppliers(suppliers)
            } catch (error) {
                console.error('Error fetching Supplier',error)
            }finally{
                setLoading(false)
            }
        };
        fetchSuppliers()
    },[])

    const handleCreateSupplier = async () => {
        try {
          const response = await createSupplier(newSupplier);
          const supplier = response.data; // Ensure correct access to supplier data
          console.log('Created supplier:', supplier);
          if (supplier) {
            setSuppliers([...suppliers, supplier]);
            setNewSupplier({ name: '', email: '', phone: '', website: '', address: '', contact_person: '' });
            setShowCreateModal(false);
            setAlert({ show: true, message: 'Supplier created successfully!', type: 'success' });
          }
        } catch (error) {
          console.error('Error creating supplier:', error);
        }
      };
      
    
      const handleUpdateSupplier = async () => {
        try {
          const response = await updateSupplier(editingSupplier.id, editingSupplier);
          const updatedSupplier = response.data; // Access the supplier correctly
          console.log('Updated supplier:', updatedSupplier);
          if (updatedSupplier) {
            setSuppliers(suppliers.map(s => s.id === editingSupplier.id ? updatedSupplier : s));
            setEditingSupplier(null);
            setShowEditModal(false);
            setAlert({ show: true, message: 'Supplier updated successfully!', type: 'success' });
          }
        } catch (error) {
          console.error('Error updating supplier:', error);
        }
      };
      
    
      const handleDeleteSupplier = async (id) => {
        if (window.confirm('Are you sure you want to delete this supplier?')) {
          try {
            await deleteSupplier(id);
            setSuppliers(suppliers.filter(supplier => supplier.id !== id));
            setAlert({ show: true, message: 'Supplier deleted successfully!', type: 'success' });
          } catch (error) {
            console.error('Error deleting Supplier:', error);
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
            <h1 className="text-3xl font-bold mb-4">Supplier Management</h1>
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
                    <th className="p-2 border-b">Email</th>
                    <th className="p-2 border-b">Phone</th>
                    <th className="p-2 border-b">Website</th>
                    <th className="p-2 border-b">Address</th>
                    <th className="p-2 border-b">Contact Person</th>
                    <th className="p-2 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((supplier, index) => (
                    <tr key={supplier.id} className="hover:bg-gray-50">
                      <td className="p-2 border-b">{index + 1}</td>
                      <td className="p-2 border-b">{supplier.name}</td>
                      <td className="p-2 border-b">{supplier.email}</td>
                      <td className="p-2 border-b">{supplier.phone}</td>
                      <td className="p-2 border-b">{supplier.website}</td>
                      <td className="p-2 border-b">{supplier.address}</td>
                      <td className="p-2 border-b">{supplier.contact_person}</td>
                      <td className="p-2 border-b">
                        <button
                          onClick={() => { setEditingSupplier(supplier); setShowEditModal(true); }}
                          className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteSupplier(supplier.id)}
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
                  <h2 className="text-2xl font-semibold mb-4">Create New Supplier</h2>
                  <label className="block mb-2">
                    <span className="text-gray-700">Name</span>
                    <input
                      type="text"
                      placeholder="Name"
                      value={newSupplier.name}
                      onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </label>
                  <label className="block mb-2">
                    <span className="text-gray-700">Email</span>
                    <input
                      type="email"
                      placeholder="Email"
                      value={newSupplier.email}
                      onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </label>
                  <label className="block mb-2">
                    <span className="text-gray-700">Phone</span>
                    <input
                      type="number"
                      placeholder="PhoneNumber"
                      value={newSupplier.phone}
                      onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </label>
                  <label className="block mb-2">
                    <span className="text-gray-700">Website</span>
                    <input
                      type="url"
                      placeholder="Website"
                      value={newSupplier.website}
                      onChange={(e) => setNewSupplier({ ...newSupplier, website: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </label>
                  <label className="block mb-2">
                    <span className="text-gray-700">Address</span>
                    <input
                      type="text"
                      placeholder="Address"
                      value={newSupplier.address}
                      onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </label>
                  <label className="block mb-2">
                    <span className="text-gray-700">Contact Person</span>
                    <input
                      type="text"
                      placeholder="Contact Person"
                      value={newSupplier.contact_person}
                      onChange={(e) => setNewSupplier({ ...newSupplier, contact_person: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </label>
                  <div className="flex justify-between">
                    <button
                      onClick={handleCreateSupplier}
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
            {showEditModal && editingSupplier && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                  <h2 className="text-2xl font-semibold mb-4">Edit Supplier</h2>
                  <label className="block mb-2">
                    <span className="text-gray-700">Name</span>
                    <input
                      type="text"
                      placeholder="Name"
                      value={editingSupplier.name}
                      onChange={(e) => setEditingSupplier({ ...editingSupplier, name: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </label>
                  <label className="block mb-2">
                    <span className="text-gray-700">Email</span>
                    <input
                      type="email"
                      placeholder="Email"
                      value={editingSupplier.email}
                      onChange={(e) => setEditingSupplier({ ...editingSupplier, email: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </label>
                  <label className="block mb-2">
                    <span className="text-gray-700">Phone</span>
                    <input
                      type="number"
                      placeholder="PhoneNumber"
                      value={editingSupplier.phone}
                      onChange={(e) => setEditingSupplier({ ...editingSupplier, phone: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </label>
                  <label className="block mb-2">
                    <span className="text-gray-700">Website</span>
                    <input
                      type="url"
                      placeholder="Website"
                      value={editingSupplier.website}
                      onChange={(e) => setEditingSupplier({ ...editingSupplier, website: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </label>
                  <label className="block mb-2">
                    <span className="text-gray-700">Address</span>
                    <input
                      type="text"
                      placeholder="Address"
                      value={editingSupplier.address}
                      onChange={(e) => setEditingSupplier({ ...editingSupplier, address: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </label>
                  <label className="block mb-2">
                    <span className="text-gray-700">Contact Person</span>
                    <input
                      type="text"
                      placeholder="Name"
                      value={editingSupplier.contact_person}
                      onChange={(e) => setEditingSupplier({ ...editingSupplier, contact_person: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </label>
                  <div className="flex justify-between">
                    <button
                      onClick={handleUpdateSupplier}
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
export default SupplierManagement