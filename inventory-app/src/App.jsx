import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import UserManagement from './components/UserManagement';
import StationManagement from './components/StationManagement';
import SupplierManagement from './components/SupplierManagement';

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
                ? <StationManagement /> 
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
