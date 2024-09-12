import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPurchaseDetails } from '../services/api'; // Assuming you have this API call

const ShowPurchase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [purchase, setPurchase] = useState(null);

  useEffect(() => {
    // Fetch distribution details
    getPurchaseDetails(id).then((response) => {
      console.log('Fetched response:', response); // Log the full response for debugging
      if (response.data && response.data.length > 0) {
        setPurchase(response.data[0]); // Extract the first item from the array
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
                    Purchase Report
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
                        <p className="text-sm font-normal text-slate-700">Purchase Detail:</p>
                        <p>Supplier Name : </p>
                        <p>{purchase?.SupplierName || 'N/A'}</p>
                        <p>Supplier Address : </p>
                        <p>{purchase?.SupplierLocation || 'N/A'}</p>
                    </div>
                    <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-800">Recorded By</p>
                        <p>{purchase?.User || 'N/A'}</p>
                    </div>
                    <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">Contact Person By</p>
                        <p>{purchase?.SupplierContactPerson || 'N/A'}</p>
                    </div>
                    <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">purchase ID</p>
                        <p>{purchase?.purchase_id || 'N/A'}</p>

                        <p className="mt-2 text-sm font-normal text-slate-700">Date of purchase</p>
                        <p>{new Date(purchase?.purchase_date).toLocaleDateString() || 'N/A'}</p>
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
                        Supplier Name
                        </th>
                        <th scope="col" className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell">
                            Quantity
                        </th>
                        <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0">
                        Product Name
                        </th>
                        <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0">
                            Email 
                        </th>
                        <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0">
                            Phone 
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-slate-200">
                        <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                            <div className="font-medium text-slate-700">{purchase?.SupplierName || 'N/A'}</div>
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                            {purchase?.product_qty || '0'}
                        </td>
                        <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            {purchase?.productName || 'N/A'}
                        </td>
                        <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            {purchase?.SupplierEmail || 'N/A'}
                        </td>
                        <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            {purchase?.SupplierPhone || 'N/A'}
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

export default ShowPurchase;
