import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiCalendar as CalendarIcon,
  FiGrid as DashboardIcon,
  FiUsers as EmployeesIcon,
  FiMessageSquare as MessagesIcon
} from 'react-icons/fi';

const Sidebar = () => {
  return (
    <div className='py-2 mt-3 fw-light'>
      {/* Dashboard Link */}
      <NavLink 
        to="/dashboard" 
        className={({ isActive }) => 
          `sidebar-item position-relative d-flex align-items-center mb-2 p-2 text-decoration-none ${isActive ? 'active-route' : ''}`
        }
      >
        <DashboardIcon className="mx-3 fs-5" />
        <span className="fs-6">Dashboard</span>
      </NavLink>
      
      {/* Employees Link */}
      <NavLink 
        to="/employees" 
        className={({ isActive }) => 
          `sidebar-item position-relative d-flex align-items-center mb-2 p-2 text-decoration-none ${isActive ? 'active-route' : ''}`
        }
      >
        <EmployeesIcon className="mx-3 fs-5" />
        <span className="fs-6">Employees</span>
      </NavLink>
      
      {/* Calendar Link */}
      <NavLink 
        to="/calendar" 
        className={({ isActive }) => 
          `sidebar-item position-relative d-flex align-items-center mb-2 p-2 text-decoration-none ${isActive ? 'active-route' : ''}`
        }
      >
        <CalendarIcon className="mx-3 fs-5" />
        <span className="fs-6">Calendar</span>
      </NavLink>
      
      {/* Messages Link */}
      <NavLink 
        to="/messages" 
        className={({ isActive }) => 
          `sidebar-item position-relative d-flex align-items-center mb-2 p-2 text-decoration-none ${isActive ? 'active-route' : ''}`
        }
      >
        <MessagesIcon className="mx-3 fs-5" />
        <span className="fs-6">Messages</span>
      </NavLink>
      
      <style>{`
        .sidebar-item {
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          color: #7a7878;
        }
        
        .sidebar-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background-color:rgb(118, 134, 157);
          transition: width 0.3s ease;
          z-index: -1;
          border-radius: 0 20px 20px 0;
        }
        
        .sidebar-item:hover, .active-route {
          color: white !important;
        }
        
        .sidebar-item:hover::before, .active-route::before {
          width: 90%;
        }
        
        .active-route::before {
          width: 90% !important;
          background-color: #0B5ED7;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;