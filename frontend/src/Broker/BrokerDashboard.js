import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import BrokerSidebar from './BrokerSidebar';
import './BrokerDashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BrokerDashboard = () => {
  const [soldHousesTotal, setSoldHousesTotal] = useState(0);
  const [waitingHousesTotal, setWaitingHousesTotal] = useState(0);
  const [totalHousesForSale, setTotalHousesForSale] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const brokerUsername = localStorage.getItem('username'); 

  useEffect(() => {
    const fetchTotalHouses = async () => {
      try {
        const soldHousesResponse = await fetch(`http://localhost:8080/api/houses/getall?brokerUsername=${brokerUsername}`);
        const waitingHousesResponse = await fetch(`http://localhost:8080/api/plans/getall?brokerUsername=${brokerUsername}`);
        
        if (!soldHousesResponse.ok || !waitingHousesResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const soldHousesData = await soldHousesResponse.json();
        const waitingHousesData = await waitingHousesResponse.json();

        const soldHousesTotal = Array.isArray(soldHousesData) ? soldHousesData.length : 0;
        const waitingHousesTotal = Array.isArray(waitingHousesData) ? waitingHousesData.length : 0;

        const total = soldHousesTotal + waitingHousesTotal;
        setSoldHousesTotal(soldHousesTotal);
        setWaitingHousesTotal(waitingHousesTotal);
        setTotalHousesForSale(total);
      } catch (error) {
        console.error('Error fetching total houses:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalHouses();
  }, [brokerUsername]);

  const handleLogout = () => {
    localStorage.removeItem('brokerUsername');
    navigate('/brokerlogin');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="broker-dashboard">
      <BrokerSidebar handleLogout={handleLogout} totalHouses={totalHousesForSale} />
      <main className="main-content">
        <div className="top-cards">
          <div className="card total-houses">
            <h3>Total Houses for Sale</h3>
            <p>{totalHousesForSale}</p>
          </div>
          <div className="card commission-received">
            <h3>Commission Received</h3>
            <p>{/* Add commission received data here if available */}</p>
          </div>
        </div>
        <div className="chart-container">
          <Bar
            data={{
              labels: ['Houses Sold', 'Houses Waiting for Sale', 'Total Houses'],
              datasets: [
                {
                  label: 'Number of Houses',
                  data: [soldHousesTotal, waitingHousesTotal, totalHousesForSale],
                  backgroundColor: ['#3498db', '#2ecc71', '#e74c3c'],
                  borderColor: ['#2980b9', '#27ae60', '#c0392b'],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Houses Statistics',
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default BrokerDashboard;
