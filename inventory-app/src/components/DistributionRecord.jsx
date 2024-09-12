import React, { useState, useEffect } from "react";
import { getDistribusi, createDistribusi, deleteDistribusi, getProduct, getStation} from "../services/api";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import SidebarComponent from "./Sidebar";

function PurchaseManagement() {
  const [distributions, setDistributions] = useState([]);
  const [stations, setStations] = useState([]);
  const [products, setProducts] = useState([]);
  const [newDistribution, setNewDistribution] = useState({
    product_id: '',
    station_id: '',
    product_qty: '',
    distribution_date: '',
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: '',
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();
  const userRole = 'distribusi';
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [distributionResponse, productResponse, stationResponse] = await Promise.all([getDistribusi(), getProduct(), getStation()]);
      
      console.log('Station API Response:', stationResponse);  
      
      setDistributions(distributionResponse.data || []);
      setProducts(productResponse.data || []);
      const stationData = Array.isArray(stationResponse) ? stationResponse : [];
            setStations(stationData);
            console.log('stations tolongg:', stationData);
    } catch (error) {
      console.error('Error Fetching Data:', error);
      setDistributions([]);
      setProducts([]);
      setStations([]);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
    console.log("Stations:", stations);
  }, []);

  const handleCreatePurchase = async () => {
    try {
      const userId = localStorage.getItem('authUserId');
      const distributionData = { ...newDistribution, user_id: userId };
      await createDistribusi(distributionData);
      await fetchData();
      setNewDistribution({
        product_id: '',
        station_id: '',
        product_qty: '',
        distribution_date: '',
      });
      setSelectedProduct(null);
      setShowCreateModal(false);
      setAlert({
        show: true,
        message: 'Distribution created successfully!',
        type: 'success',
      });
    } catch (error) {
      console.error('Error creating distribution:', error);
      setAlert({ show: true, message: 'Error creating distribution', type: 'error' });
    }
  };

  const handleDeleteDistribution = async (id) => {
    if (window.confirm('Are you sure you want to delete this distribution?')) {
      try {
        await deleteDistribusi(id);
        setDistributions(distributions.filter(distribution => distribution.id !== id));
        setAlert({
          show: true,
          message: 'Distribution has been deleted!',
          type: 'success',
        });
      } catch (error) {
        console.error('Error deleting distribution:', error);
        setAlert({ show: true, message: 'Error deleting purchase', type: 'error' });
      }
    }
  };

  const closeAlert = () => {
    setAlert({ ...alert, show: false });
  };

  const handleProductChange = (e) => {
    const productId = e.target.value;
    setNewDistribution({ ...newDistribution, product_id: productId });
    const product = products.find(p => p.id.toString() === productId);
    console.log('product ku:', product)
    setSelectedProduct(product);
  };

  const handleStationChange = (e) => {
    const stationId = e.target.value;
    setNewDistribution({ ...newDistribution, station_id: stationId });
    const station = stations.find(s => s.id.toString() === stationId);
    console.log('Selected station:', station);
  };

  const handleShowDistribution = (id) => {
    navigate(`/distribusi/records/show/${id}`);
  };  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <SidebarComponent role={userRole} onLogout={handleLogout} />
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-4">Distribution Management</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4"
        >
          Create New Purchase
        </button>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Existing Distribution</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border-b">ID</th>
                <th className="p-2 border-b">User</th>
                <th className="p-2 border-b">Product</th>
                <th className="p-2 border-b">Station</th>
                <th className="p-2 border-b">Quantity</th>
                <th className="p-2 border-b">Purchase Date</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {distributions.map((distribution, index) => (
                <tr key={distribution.id} className="hover:bg-gray-50">
                  <td className="p-2 border-b">{index + 1}</td>
                  <td className="p-2 border-b">{distribution.penanggung_jawab}</td>
                  <td className="p-2 border-b">{distribution.product_name}</td>
                  <td className="p-2 border-b">{distribution.station_name}</td>
                  <td className="p-2 border-b">{distribution.product_qty}</td>
                  <td className="p-2 border-b">{distribution.distribution_date}</td>
                  <td className="p-2 border-b">
                    <button
                      onClick={() => handleDeleteDistribution(distribution.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleShowDistribution(distribution.id)}
                      className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Create Purchase Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4">Create New Distribution</h2>
              <label className="block mb-2">
                <span className="text-gray-700">Product</span>
                <select
                  id="product_id"
                  name="product_id"
                  value={newDistribution.product_id}
                  onChange={handleProductChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select a product</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mb-2">
                <span className="text-gray-700">Station</span>
                <select
                  id="station_id"
                  name="station_id"
                  value={newDistribution.station_id}
                  onChange={handleStationChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select a Station</option>
                  {stations.map(station => (
                    <option key={station.id} value={station.id}>
                      {station.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mb-2">
                <span className="text-gray-700">Quantity</span>
                <input
                    type="number"
                    value={newDistribution.product_qty}
                    onChange={(e) => {
                    const selectedProduct = products.find(product => product.id.toString() === newDistribution.product_id);
                    const maxStockQty = selectedProduct ? selectedProduct.stock_qty : 1;

                    let enteredQty = parseInt(e.target.value, 10);

                    // Ensure enteredQty is a valid number and within the allowed range
                    if (isNaN(enteredQty) || enteredQty < 1) {
                        enteredQty = 1;
                    } else if (enteredQty > maxStockQty) {
                        enteredQty = maxStockQty;
                    }

                    setNewDistribution({ ...newDistribution, product_qty: enteredQty });
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    min="1"
                    max={products.find(product => product.id.toString() === newDistribution.product_id)?.stock_qty || 1}
                />
              </label>

              <label className="block mb-4">
                <span className="text-gray-700">Distribution Date</span>
                <input
                  type="date"
                  value={newDistribution.distribution_date}
                  onChange={(e) => setNewDistribution({ ...newDistribution, distribution_date: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
              <div className="flex justify-between">
                <button
                  onClick={handleCreatePurchase}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Create Distribution
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

export default PurchaseManagement;
