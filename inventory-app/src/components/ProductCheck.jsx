import React, {useState,useEffect} from "react";
import SidebarComponent from "./Sidebar";
import { getProduct } from "../services/api";

function ProductCheck () {
    const [products, setProducts] = useState([]);

    const userRole = 'distribusi';
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
    }
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [productResponse] = await Promise.all([getProduct()]);
            console.log('Fetched Products Response:', productResponse);
            const productsData = productResponse.data || [];
            setProducts(Array.isArray(productsData) ? productsData : []);
            
        } catch (error) {
            console.error('Error Fetching Data:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); // Call fetchData inside useEffect
    }, [])

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
            <h1 className="text-3xl font-bold mb-4">Product Records</h1>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
    </div>
    )
}
export default ProductCheck;