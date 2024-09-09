import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { getUserDetails } from '../services/api';
import AdminDashboard from './AdminDashboard';
import PurchaseDashboard from '../components/PurchaseDashboard';
import DistribusiDashboard from '../components/DistribusiDashboard';
import SidebarComponent from '../components/Sidebar';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getUserDetails();
      setUser(userDetails);
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/logout');
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  if (!user) return  <div className="flex justify-center items-center h-screen">   
    <div
      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status">
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Loading...</span>
    </div>
  </div>


  let DashboardComponent;
  switch (user.role) {
    case 'admin':
      DashboardComponent = AdminDashboard;
      break;
    case 'purchase':
      DashboardComponent = PurchaseDashboard;
      break;
    case 'distribusi':
      DashboardComponent = DistribusiDashboard;
      break;
    default:
      return <div>Invalid role</div>;
  }

  return (
    <div className="flex">
      <SidebarComponent role={user.role} onLogout={handleLogout} />
      <div className="flex-1 p-4">
        <DashboardComponent name={user.name} />
      </div>
    </div>
  );
}

export default Dashboard;