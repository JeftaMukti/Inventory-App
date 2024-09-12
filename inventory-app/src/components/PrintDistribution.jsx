import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDistribusiDetails } from '../services/api'; // Assuming you have this API call

const ShowDistribution = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [distribution, setDistribution] = useState(null);

  useEffect(() => {
    // Fetch distribution details
    getDistribusiDetails(id).then((response) => {
      console.log('Fetched response:', response); // Log the full response for debugging
      if (response.data && response.data.length > 0) {
        setDistribution(response.data[0]); // Extract the first item from the array
      }
    }).catch(error => {
      console.error('Error fetching data:', error); // Handle errors if any
    });
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
        <div className="max-w-5xl mx-auto py-16 bg-white">
            <article className="overflow-hidden">
            <div className="bg-white rounded-b-md">
                <div className="p-9">
                <div className="space-y-6 text-slate-700">
                    <p className="text-xl font-extrabold tracking-tight uppercase font-body">
                    Distribution Report
                    </p>

                    {/* Print and Back buttons */}
                    <div className="flex gap-4 mb-8 no-print">
                    <button
                        onClick={handlePrint}
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    >
                        Print
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                    >
                        Back
                    </button>
                    </div>
                </div>
                </div>
                <div className="p-9">
                <div className="flex w-full">
                    <div className="grid grid-cols-4 gap-12">
                    <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">Distribution Detail:</p>
                        <p>{distribution?.station_name || 'N/A'}</p>
                        <p>{distribution?.station_address || 'N/A'}</p>
                        <p>{distribution?.station_manager || 'N/A'}</p>
                    </div>
                    <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">Distributed By</p>
                        <p>{distribution?.penanggung_jawab || 'N/A'}</p>
                    </div>
                    <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">Distribution ID</p>
                        <p>{distribution?.id || 'N/A'}</p>

                        <p className="mt-2 text-sm font-normal text-slate-700">Date of Distribution</p>
                        <p>{new Date(distribution?.distribution_date).toLocaleDateString() || 'N/A'}</p>
                    </div>
                    </div>
                </div>
                </div>

                <div className="p-9">
                <div className="flex flex-col mx-0 mt-8">
                    <table className="min-w-full divide-y divide-slate-500">
                    <thead>
                        <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0">
                            Product Name
                        </th>
                        <th scope="col" className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell">
                            Quantity
                        </th>
                        <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0">
                            Station
                        </th>
                        <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0">
                            Station Manager
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-slate-200">
                        <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                            <div className="font-medium text-slate-700">{distribution?.product_name || 'N/A'}</div>
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                            {distribution?.product_qty || '0'}
                        </td>
                        <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            {distribution?.station_name || 'N/A'}
                        </td>
                        <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            {distribution?.station_manager || 'N/A'}
                        </td>
                        </tr>
                        {/* More rows for additional products */}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            </article>
        </div>
    </div>
    
  );
};

export default ShowDistribution;
