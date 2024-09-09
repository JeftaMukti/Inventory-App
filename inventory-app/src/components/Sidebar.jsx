import React from 'react';
import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiShoppingBag, HiTruck, HiArrowSmRight } from 'react-icons/hi'; 

function SidebarComponent({ role, onLogout }) {
  return (
    <Sidebar 
      aria-label="Sidebar with logo branding example" 
      className="flex flex-col h-screen"
    >
      <div className="flex-grow">
        <Sidebar href="#" className="text-xl font-semibold mb-4">
          Inventory System
        </Sidebar>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
              <Sidebar.Item href="/dashboard" icon={HiChartPie}>
                Dashboard
              </Sidebar.Item>
            {role === 'admin' && (
              <Sidebar.Item href="/admin/users" icon={HiShoppingBag}>
                Manage Users
              </Sidebar.Item>
            )}
            {(role === 'purchase') && (
              <Sidebar.Item href="#" icon={HiShoppingBag}>
                Purchase Records
              </Sidebar.Item>
            )}
            {(role === 'distribusi') && (
              <Sidebar.Item href="#" icon={HiTruck}>
                Distribution Records
              </Sidebar.Item>
            )}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </div>
      <Sidebar.ItemGroup className="mt-auto">
        <Sidebar.Item href="#" icon={HiArrowSmRight} onClick={onLogout}>
          Logout
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar>
  );
}

export default SidebarComponent;
