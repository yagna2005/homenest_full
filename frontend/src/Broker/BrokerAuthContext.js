import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const BrokerAuthContext = createContext();

export const BrokerAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [broker, setBroker] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBroker = localStorage.getItem('broker');
    if (storedBroker) {
      setBroker(JSON.parse(storedBroker));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (brokerDetails) => {
    localStorage.setItem('broker', JSON.stringify(brokerDetails));
    setBroker(brokerDetails);
    setIsAuthenticated(true);
    navigate('/broker-dashboard');
  };

  const logout = () => {
    localStorage.removeItem('broker');
    setBroker(null);
    setIsAuthenticated(false);
    navigate('/broker-login');
  };

  return (
    <BrokerAuthContext.Provider value={{ isAuthenticated, broker, login, logout }}>
      {children}
    </BrokerAuthContext.Provider>
  );
};
