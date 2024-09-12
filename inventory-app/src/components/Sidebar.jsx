import React from 'react';
import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiShoppingBag, HiTruck, HiArrowSmRight, HiUserGroup, HiOfficeBuilding, HiLibrary, HiCurrencyDollar } from 'react-icons/hi'; 

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
              <Sidebar.Item href="/admin/users" icon={HiUserGroup}>
                Manage Users
              </Sidebar.Item>
            )}
            {(role === 'purchase') && (
              <Sidebar.Item href="/purchase/records" icon={HiCurrencyDollar}>
                Purchase Records
              </Sidebar.Item>
            )}
            {(role === 'purchase') && (
              <Sidebar.Item href="/purchase/suppliers" icon={HiLibrary}>
                Manage Suppliers
              </Sidebar.Item>
            )}
            {(role === 'purchase') && (
              <Sidebar.Item href="/purchase/products" icon={HiShoppingBag}>
                Manage Products
              </Sidebar.Item>
            )}
            {(role === 'distribusi') && (
              <Sidebar.Item href="/distribusi/records" icon={HiTruck}>
                Distribution Records
              </Sidebar.Item>
            )}
            {(role === 'distribusi') && (
              <Sidebar.Item href="/distribusi/station" icon={HiShoppingBag }>
                Manage Station
              </Sidebar.Item>
            )}
            {(role === 'distribusi') && (
              <Sidebar.Item href="/distribusi/product" icon={HiOfficeBuilding }>
                Check Product
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
