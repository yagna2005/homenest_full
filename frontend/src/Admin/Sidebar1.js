import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ handleLogout }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Link to="/admin"> 
          <h2>Admin Dashboard</h2>
        </Link>
      </div>
      <ul className="sidebar-nav">
        <li><Link to="/admin/sell">Add House</Link></li>
        <li><Link to="/admin/PlanAdmin">Plan</Link></li>
        <li><Link to="/admin/HouseList">HouseList</Link></li>
        <li><Link to="/admin/manage" >Manage</Link></li>
        <li><Link to="/admin/approval">Approval</Link></li>
        <li>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
