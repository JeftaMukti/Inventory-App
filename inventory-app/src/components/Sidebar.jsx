import React from 'react';
import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiShoppingBag, HiTruck, HiArrowSmRight } from 'react-icons/hi'; 

function SidebarComponent({ role, onLogout }) {
  return (
    <Sidebar aria-label="Sidebar with logo branding example">
      <Sidebar href="#">
        Inventory System
      </Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          {role === 'admin' && (
            <Sidebar.Item href="/admin/users" icon={HiShoppingBag}>
              Manage Users
            </Sidebar.Item>
          )}
          {(role === 'admin' || role === 'purchase') && (
            <Sidebar.Item href="#" icon={HiShoppingBag}>
              Purchase Records
            </Sidebar.Item>
          )}
          {(role === 'admin' || role === 'distribusi') && (
            <Sidebar.Item href="#" icon={HiTruck}>
              Distribution Records
            </Sidebar.Item>
          )}
          <Sidebar.Item href="#" icon={HiArrowSmRight} onClick={onLogout}>
            Logout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SidebarComponent;
