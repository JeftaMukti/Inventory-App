import React, { useState, useEffect } from "react";
import { getPurchase, createPurchase, deletePurchase, getProduct } from "../services/api";
import Alert from "./Alert";
import SidebarComponent from "./Sidebar";

function PurchaseManagement() {
  const [purchases, setPurchases] = useState([]);
  const [products, setProducts] = useState([]);
  const [newPurchase, setNewPurchase] = useState({
    product_id: '',
    product_qty: '',
    purchase_date: '',
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: '',
  });
  const [showCreateModal, setShowCreateModal] = useState(false);

  const userRole = 'purchase';
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [purchaseResponse, productResponse] = await Promise.all([getPurchase(), getProduct()]);
      setPurchases(purchaseResponse.data || []);
      setProducts(productResponse.data || []);
    } catch (error) {
      console.error('Error Fetching Data:', error);
      setPurchases([]);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreatePurchase = async () => {
    try {
      const userId = localStorage.getItem('authUserId');
      const purchaseData = { ...newPurchase, user_id: userId };
      await createPurchase(purchaseData);
      await fetchData();
      setNewPurchase({
        product_id: '',
        product_qty: '',
        purchase_date: '',
      });
      setSelectedProduct(null);
      setShowCreateModal(false);
      setAlert({
        show: true,
        message: 'Purchase created successfully!',
        type: 'success',
      });
    } catch (error) {
      console.error('Error creating purchase:', error);
      setAlert({ show: true, message: 'Error creating purchase', type: 'error' });
    }
  };

  const handleDeletePurchase = async (id) => {
    if (window.confirm('Are you sure you want to delete this purchase?')) {
      try {
        await deletePurchase(id);
        setPurchases(purchases.filter(purchase => purchase.purchase_id !== id));
        setAlert({
          show: true,
          message: 'Purchase has been deleted!',
          type: 'success',
        });
      } catch (error) {
        console.error('Error deleting purchase:', error);
        setAlert({ show: true, message: 'Error deleting purchase', type: 'error' });
      }
    }
  };

  const closeAlert = () => {
    setAlert({ ...alert, show: false });
  };

  const handleProductChange = (e) => {
    const productId = e.target.value;
    setNewPurchase({ ...newPurchase, product_id: productId });
    const product = products.find(p => p.id.toString() === productId);
    setSelectedProduct(product);
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
        <h1 className="text-3xl font-bold mb-4">Purchase Management</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4"
        >
          Create New Purchase
        </button>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Existing Purchases</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border-b">ID</th>
                <th className="p-2 border-b">User</th>
                <th className="p-2 border-b">Product</th>
                <th className="p-2 border-b">Supplier</th>
                <th className="p-2 border-b">Quantity</th>
                <th className="p-2 border-b">Purchase Date</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase, index) => (
                <tr key={purchase.purchase_id} className="hover:bg-gray-50">
                  <td className="p-2 border-b">{index + 1}</td>
                  <td className="p-2 border-b">{purchase.User}</td>
                  <td className="p-2 border-b">{purchase.productName}</td>
                  <td className="p-2 border-b">{purchase.SupplierName}</td>
                  <td className="p-2 border-b">{purchase.product_qty}</td>
                  <td className="p-2 border-b">{purchase.purchase_date}</td>
                  <td className="p-2 border-b">
                    <button
                      onClick={() => handleDeletePurchase(purchase.purchase_id)}
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

        {/* Create Purchase Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4">Create New Purchase</h2>
              <label className="block mb-2">
                <span className="text-gray-700">Product</span>
                <select
                  id="product_id"
                  name="product_id"
                  value={newPurchase.product_id}
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
                <span className="text-gray-700">Supplier</span>
                <input
                  type="text"
                  value={selectedProduct ? selectedProduct.supplier : ''}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
              <label className="block mb-2">
                <span className="text-gray-700">Quantity</span>
                <input
                  type="number"
                  value={newPurchase.product_qty}
                  onChange={(e) => setNewPurchase({ ...newPurchase, product_qty: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
              <label className="block mb-4">
                <span className="text-gray-700">Purchase Date</span>
                <input
                  type="date"
                  value={newPurchase.purchase_date}
                  onChange={(e) => setNewPurchase({ ...newPurchase, purchase_date: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
              <div className="flex justify-between">
                <button
                  onClick={handleCreatePurchase}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Create Purchase
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
