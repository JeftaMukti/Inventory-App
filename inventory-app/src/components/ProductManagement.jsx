import React, {useState, useEffect} from "react";
import { getProduct, createProduct, updateProduct, deleteProduct, getSupplier } from "../services/api";
import Alert from "./Alert";
import SidebarComponent from "./Sidebar";


function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        discription: '',
        supplier_id: '',
        stock_qty: '',
    });
    const [editingProduct, setEditingProduct] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({
        show:false,
        message: '',
        type: '',
    });

    const userRole = 'purchase';
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
    }

    const fetchData = async () => {
        setLoading(true);
        try {
            const [productResponse, supplierResponse] = await Promise.all([getProduct(), getSupplier()]);
            console.log('Fetched Products Response:', productResponse);
            console.log('Fetched Suppliers Response:', supplierResponse);
            
            const productsData = productResponse.data || [];
            setProducts(Array.isArray(productsData) ? productsData : []);
            
            const suppliersData = Array.isArray(supplierResponse) ? supplierResponse : [];
            setSuppliers(suppliersData);
            console.log('Suppliers:', suppliersData);
        } catch (error) {
            console.error('Error Fetching Data:', error);
            setProducts([]);
            setSuppliers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); // Call fetchData inside useEffect
    }, [])
      
      const handleCreateProduct = async () => {
        try {
          await createProduct(newProduct);
          await fetchData(); // Re-fetch the data
          setNewProduct({
            name: '',
            discription: '',
            supplier_id: '',
            stock_qty: '',
          });
          setShowCreateModal(false);
          setAlert({
            show: true,
            message: 'Product created successfully!',
            type: 'success',
          });
        } catch (error) {
          console.error('Error creating product:', error);
          setAlert({ show: true, message: 'Error creating product', type: 'error' });
        }
      };
      
      const handleUpdateProduct = async () => {
        try {
          await updateProduct(editingProduct.id, editingProduct);
          await fetchData(); // Re-fetch the data
          setEditingProduct(null);
          setShowEditModal(false);
          setAlert({
            show: true,
            message: 'Product updated successfully!',
            type: 'success',
          });
        } catch (error) {
          console.error('Error updating product:', error);
          setAlert({ show: true, message: 'Error updating product', type: 'error' });
        }
      };
      

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are You Sure Want To Delete This Product?')) {
            try {
                await deleteProduct(id);
                setProducts(products.filter(product => product.id !== id));
                setAlert({
                    show:true,
                    message:'product has been deleted!',
                    type:'success',
                })
            } catch (error) {
                console.error('Error deleting product:', error);
                setAlert({ show: true, message: 'Error deleting product', type: 'error' });
            }
        }
    }

    const closeAlert = () => {
        setAlert({...alert, show:false});
    }

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
          {/* Sidebar */}
          <SidebarComponent role={userRole} onLogout={handleLogout} />
    
          {/* Main Content */}
          <div className="flex-1 p-4">
            <h1 className="text-3xl font-bold mb-4">Product Management</h1>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4"
            >
              Create New Product
            </button>
    
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Existing Products</h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2 border-b">No</th>
                    <th className="p-2 border-b">Name</th>
                    <th className="p-2 border-b">Description</th>
                    <th className="p-2 border-b">Supplier</th>
                    <th className="p-2 border-b">Amount</th>
                    <th className="p-2 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="p-2 border-b">{index + 1}</td>
                      <td className="p-2 border-b">{product.name}</td>
                      <td className="p-2 border-b">{product.discription}</td>
                      <td className="p-2 border-b">{product.supplier}</td>
                      <td className="p-2 border-b">
                      {product.stock_qty === null || product.stock_qty === 0 ? 'Product Habis' : product.stock_qty}
                      </td>
                      <td className="p-2 border-b">
                        <button
                          onClick={() => { setEditingProduct(product); setShowEditModal(true); }}
                          className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
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
                <div className="fixed inset-0 flex items-center justify-center z-50" key="create-product-modal">
                    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-2xl font-semibold mb-4">Create New Product</h2>
                    <label className="block mb-2">
                        <span className="text-gray-700">Name</span>
                        <input
                        type="text"
                        placeholder="Name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Description</span>
                        <input
                        type="text"
                        placeholder="Description"
                        value={newProduct.discription}
                        onChange={(e) => setNewProduct({ ...newProduct, discription: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700">Supplier</span>
                        <select
                            value={newProduct.supplier_id}
                            onChange={(e) => setNewProduct({ ...newProduct, supplier_id: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            >
                            <option value="">Select a Supplier</option>
                            {suppliers.map((supplier) => (
                                <option key={supplier.id} value={supplier.id}>
                                {supplier.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <div className="flex justify-between">
                        <button
                        onClick={handleCreateProduct}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                        Create Product
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
            {showEditModal && editingProduct && (
                <div className="fixed inset-0 flex items-center justify-center z-50" key="edit-product-modal">
                    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
                    <label className="block mb-2">
                        <span className="text-gray-700">Name</span>
                        <input
                        type="text"
                        placeholder="Name"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Description</span>
                        <input
                        type="text"
                        placeholder="Description"
                        value={editingProduct.discription}
                        onChange={(e) => setEditingProduct({ ...editingProduct, discription: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700">Supplier</span>
                        <select
                        value={editingProduct.supplier_id}
                        onChange={(e) => setEditingProduct({ ...editingProduct, supplier_id: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        >
                        <option value="">Select a Supplier</option>
                        {suppliers.length > 0 ? (
                            suppliers.map((supplier) => (
                            <option key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </option>
                            ))
                        ) : (
                            <option value="">No Suppliers Available</option>
                        )}
                        </select>
                    </label>
                    <div className="flex justify-between">
                        <button
                        onClick={handleUpdateProduct}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                        Update Product
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
    )
}
export default ProductManagement