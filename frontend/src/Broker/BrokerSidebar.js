import React from 'react';
import { Link } from 'react-router-dom';
import './BrokerSidebar.css'; // Updated import for BrokerSidebar CSS

const BrokerSidebar = ({ handleLogout }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Link to="/brokerdash"> 
          <h2>Broker Dashboard</h2>
        </Link>
      </div>
      <ul className="sidebar-nav">
        <li><Link to="/brokeradd">Add House</Link></li>
        <li>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </li>
      </ul>
    </aside>
  );
};

export default BrokerSidebar;