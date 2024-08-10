import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use Auth Context
export const useAuth = () => useContext(AuthContext);

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Add user state

  // Check authentication status on mount
  useEffect(() => {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    if (username && role) {
      setUser({ username, role }); // Set user state
      setIsAuthenticated(true);
    }
  }, []);

  // Function to log in
  const login = (username, role) => {
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
    setUser({ username, role }); // Set user state
    setIsAuthenticated(true);
  };

  // Function to log out
  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    setUser(null); // Clear user state
    setIsAuthenticated(false);
  };

  // Provider value
  const value = {
    isAuthenticated,
    user, // Include user in the context value
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
