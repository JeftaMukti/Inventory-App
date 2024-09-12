import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import UserManagement from './components/UserManagement';
import StationManagement from './components/StationManagement';
import SupplierManagement from './components/SupplierManagement';
import ProductManagement from './components/ProductManagement';
import ProductCheck from './components/ProductCheck';
import PurchaseManagement from './components/PurchaseRecord';
import DistributionRecords from './components/DistributionRecord';
import ShowDistribution from './components/PrintDistribution';
import ShowPurchase from './components/PrintPurchase';

function App() {
  console.log("Rendering App component");

  return (
    <Router>
      <div className="App min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              localStorage.getItem('token') 
                ? <Dashboard /> 
                : <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              localStorage.getItem('token') 
                ? <UserManagement /> 
                : <Navigate to="/login" replace />
            }
          />
          <Route 
            path="/distribusi/station" 
            element={
              localStorage.getItem('token') 
                ? <StationManagement/> 
                : <Navigate to="/login" replace />
            }
          />
          <Route 
            path="/distribusi/product" 
            element={
              localStorage.getItem('token') 
                ? <ProductCheck/> 
                : <Navigate to="/login" replace />
            }
          />
          <Route 
            path="/distribusi/records/show/:id" 
            element={localStorage.getItem('token') 
              ? <ShowDistribution /> 
              : <Navigate to="/login" replace />
            }
          />
          <Route 
            path="/distribusi/records" 
            element={
              localStorage.getItem('token') 
                ? <DistributionRecords/> 
                : <Navigate to="/login" replace />
            }
          />
          <Route 
            path="/purchase/records" 
            element={
              localStorage.getItem('token') 
                ? <PurchaseManagement/> 
                : <Navigate to="/login" replace />
            }
          />
          <Route 
            path="/purchase/records/show/:id" 
            element={localStorage.getItem('token') 
              ? <ShowPurchase /> 
              : <Navigate to="/login" replace />
            }
          />
          <Route 
            path="/purchase/products" 
            element={
              localStorage.getItem('token') 
                ? <ProductManagement/> 
                : <Navigate to="/login" replace />
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path='/purchase/suppliers'
            element={
              localStorage.getItem('token')
              ? <SupplierManagement/>
              : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
