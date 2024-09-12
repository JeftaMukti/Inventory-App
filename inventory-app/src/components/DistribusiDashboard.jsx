import React, {useState,useEffect} from 'react';
import { getProduct, getStation, getDistribusi } from '../services/api';

function DistribusiDashboard({ name }) {
  const [productCount, setProductCount] = useState(0);
  const [stationCount, setStationCount] = useState(0);
  const [distributions, setDistributions] = useState([])

  useEffect(() => {
    const fetchProductCount = async () => {
      const products = await getProduct();
      setProductCount(products.data.length);

      const stations = await getStation();
      setStationCount(stations.length);

      
      const distribution = await getDistribusi();
      setDistributions(distribution.data);
    };

    fetchProductCount();
  }, []);

  return (
    <div>
       <div className="flex-1 p-8">
          <nav className="bg-white shadow-md mb-4">
            <div className="max-w-7xl mx-auto px-4 py-2">
              <div className="flex justify-between">
                <div className="text-xl font-bold">Distribution Dashboard</div>
                <div className="flex items-center space-x-4">
                  <div className="text-gray-500">Welcome, {name}</div>
                </div>
              </div>
            </div>
          </nav>

          {/* Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-lg font-semibold">Stations</h3>
              <p className="text-2xl font-bold">{stationCount}</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-lg font-semibold">Products</h3>
              <p className="text-2xl font-bold">{productCount}</p>
            </div>
          </div>
          {/* Table for Recent Activity */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Distribution Activity</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="py-2 px-4">No</th>
                    <th className="py-2 px-4">Station</th>
                    <th className="py-2 px-4">Product</th>
                    <th className="py-2 px-4">Quantity</th>
                    <th className="py-2 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                {distributions.map((distribusi,index) => (
                  <tr key={distribusi.id}>
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{distribusi.station_name}</td>
                    <td className="py-2 px-4">{distribusi.product_name}</td>
                    <td className="py-2 px-4">{distribusi.product_qty}</td>
                    <td className="py-2 px-4">{distribusi.distribution_date}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
}

export default DistribusiDashboard;