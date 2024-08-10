import React, { useState, useEffect } from 'react';
import './Status.css';

const Status = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/broker-add/getall');
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

  const getStatus = (property) => {
    // Here you would implement the logic to determine if a property is approved or rejected.
    // For this example, I'm just using a placeholder value.
    return property.approved ? 'Approved' : 'Rejected';
  };

  return (
    <div className="status-container">
      <h1>Status Page</h1>
      {properties.length === 0 ? (
        <p>No properties to show.</p>
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
              <p className={`status ${getStatus(property).toLowerCase()}`}>
                Status: {getStatus(property)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Status;
