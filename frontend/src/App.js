import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AboutPage from './User/AboutPage';
import BuyPage from './User/BuyPage';
import HomePage from './User/HomePage';
import LoginPage from './User/LoginPage';
import PlanPage from './User/PlanPage';
import SignupPage from './User/SignupPage';
import AdminDashboard from './Admin/AdminDashboard';
import SellPage from './Admin/SellPage';
import PlanAdmin from './Admin/PlanAdmin';
import SupportPage from './User/CustomerSupportPage';
import HouseList from './Admin/HouseList';
import AuthGuard from './User/AuthGuard';
import { AuthProvider } from './User/AuthContext';
import ProtectedRoute from './User/ProtectedRoute';
import ManageUser from './Admin/ManageUser';
import BrokerLogin from './Broker/BrokerLogin';
import BrokerSignup from './Broker/BrokerSignup';
import BrokerSidebar from './Broker/BrokerSidebar';
import BrokerDashboard from './Broker/BrokerDashboard';
import BrokerAdd from './Broker/BrokerAdd';
import Approval from './Admin/Approval';


const App = () => {
  return (
    <AuthProvider >
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AuthGuard><AboutPage /></AuthGuard>} />
        <Route path="/buy" element={<AuthGuard><BuyPage /></AuthGuard>} />
        <Route path="/plan" element={<AuthGuard><PlanPage /></AuthGuard>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/brokerlogin" element={<BrokerLogin />}/>
        <Route path="/brokersignup" element={<BrokerSignup />}/>
        <Route path="/brokersidebar" element={<BrokerSidebar />}/>
        <Route path="/brokerdash" element={<BrokerDashboard />}/>
        <Route path="/brokeradd" element={<BrokerAdd />}/>
        <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/sell"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <SellPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/planadmin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PlanAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/HouseList"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <HouseList />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/manage" element={<ProtectedRoute allowedRoles={['admin']}>
            <ManageUser />
          </ProtectedRoute>}
          />
          <Route path="/admin/approval" element={<ProtectedRoute allowedRoles={['admin']}>
            <Approval />
          </ProtectedRoute>}
          />
        <Route path="/customersupport" element={<AuthGuard><SupportPage /></AuthGuard>}/>
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
