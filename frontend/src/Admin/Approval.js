import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import './Approval.css';
import Sidebar from './Sidebar1';

const Approval = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch pending properties from the broker add endpoint
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/brokers/getall');
        if (response.ok) {
          const data = await response.json();
          setProperties(data);
        } else {
          console.error('Failed to fetch properties');
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const sendNotificationEmail = async (brokerEmail, status, username ) => {
    const templateParams = {
      to_email: brokerEmail,
      username: username,
      subject: `Property ${status}`,
      message: `The property has been ${status}.`,
    };

    try {
      await emailjs.send('service_aee7lo4', 'template_66qaps2', templateParams, 'O09Qc98boaUdvneEA');
      console.log('Notification email sent successfully!');
    } catch (error) {
      console.error('Failed to send notification email:', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const property = properties.find(p => p.id === id);
      const response = await fetch('http://localhost:8080/api/houses/addhouse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(property),
      });

      if (response.ok) {
        // Remove property from broker add list
        await fetch(`http://localhost:8080/api/brokers/delete/${id}`, {
          method: 'DELETE',
        });
        setProperties(properties.filter(p => p.id !== id));
        
        // Send notification email to the broker
        sendNotificationEmail(property.brokerEmail, 'approved');
      } else {
        console.error('Failed to add property to house list');
      }
    } catch (error) {
      console.error('Error approving property:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const property = properties.find(p => p.id === id);
      await fetch(`http://localhost:8080/api/brokers/delete/${id}`, {
        method: 'DELETE',
      });
      setProperties(properties.filter(p => p.id !== id));
      
      // Send notification email to the broker
      sendNotificationEmail(property.brokerEmail, 'rejected');
    } catch (error) {
      console.error('Error rejecting property:', error);
    }
  };

  return (
    <div className="cfg">
        <Sidebar />
    <div className="approval-container">
      <h1>Approval Page</h1>
      {properties.length === 0 ? (
        <p>No properties to approve.</p>
      ) : (
        <div className="properties-list">
          {properties.map((property) => (
            <div key={property.id} className="property-card">
              <h2>{property.title}</h2>
              <p>{property.description}</p>
              <img src={property.image} alt={property.title} className="property-image" />
              <p><strong>Owner:</strong> {property.owner}</p>
              <p><strong>Estimated Price:</strong> {property.estimatedPrice}</p>
              <p><strong>Location:</strong> {property.location}</p>
              <p><strong>Category:</strong> {property.category}</p>
              <button onClick={() => handleApprove(property.id)} className="approve-button">Allow</button>
              <button onClick={() => handleReject(property.id)} className="reject-button">Reject</button>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default Approval;
