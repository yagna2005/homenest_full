import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar1';
import './HouseList.css';

const HouseList = () => {
  const [houses, setHouses] = useState([]);
  const [plans, setPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/houses/getall');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setHouses(data);
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    };

    const fetchPlans = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/plans/getall');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchHouses();
    fetchPlans();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setEditMode(false);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleDeleteClick = async () => {
    const url = selectedItem.title ? `http://localhost:8080/api/houses/delete/${selectedItem.id}` : `http://localhost:8080/api/plans/delete/${selectedItem.id}`;
    try {
      const response = await fetch(url, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      alert('Deleted successfully');
      setSelectedItem(null);
      setHouses(houses.filter(h => h.id !== selectedItem.id));
      setPlans(plans.filter(p => p.id !== selectedItem.id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const url = selectedItem.title ? `http://localhost:8080/api/houses/update/${selectedItem.id}` : `http://localhost:8080/api/plans/update/${selectedItem.id}`;
    const method = 'PUT';
    const body = JSON.stringify(selectedItem);
    try {
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedItem = await response.json();
      alert('Updated successfully');
      if (selectedItem.title) {
        setHouses(houses.map(h => (h.id === updatedItem.id ? updatedItem : h)));
      } else {
        setPlans(plans.map(p => (p.id === updatedItem.id ? updatedItem : p)));
      }
      setEditMode(false);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedItem({ ...selectedItem, [name]: value });
  };

  const filteredHouses = houses.filter((house) => {
    return (
      (house.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        house.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'All' || house.category === selectedCategory || selectedCategory === 'Buy')
    );
  });

  const filteredPlans = plans.filter((plan) => {
    return (
      (plan.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.cent.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'All' || plan.category === selectedCategory || selectedCategory === 'Plan')
    );
  });

  return (
    <div className="house-list-container">
      <Sidebar />
      <div className="main-content">
        <div className="list-container">
          <h1>House Listings and Plans</h1>
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search by title, description, category, or cent"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="All">All Categories</option>
              <option value="Modern">Modern</option>
              <option value="Luxury">Luxury</option>
              <option value="Cozy">Cozy</option>
              <option value="Traditional">Traditional</option>
              <option value="Basic Plan">Basic Plan</option>
              <option value="Premium Plan">Premium Plan</option>
              <option value="Buy">Buy</option>
              <option value="Plan">Plan</option>
            </select>
          </div>
          <div className="listings">
            {filteredHouses.map((house) => (
              <div key={house.id} className="card" onClick={() => handleCardClick(house)}>
                <img src={house.image} alt={house.title} />
                <h3>{house.title}</h3>
                <p>{house.location}</p>
                <p>{house.description}</p>
                <p><strong>Estimated Price:</strong> {house.estimatedPrice}</p>
              </div>
            ))}
            {filteredPlans.map((plan) => (
              <div key={plan.id} className="card" onClick={() => handleCardClick(plan)}>
                <img src={plan.sampleImage} alt={plan.category} />
                <h3>{plan.category}</h3>
                <p><strong>Cent:</strong> {plan.cent}</p>
                <p><strong>Estimated Amount:</strong> {plan.estimatedAmount}</p>
              </div>
            ))}
          </div>
        </div>
        {selectedItem && (
          <div className="details-container">
            {editMode ? (
              <form onSubmit={handleSave}>
                <h2>Edit {selectedItem.title ? 'House' : 'Plan'}</h2>
                <label>
                  Title:
                  <input
                    type="text"
                    name="title"
                    value={selectedItem.title || selectedItem.category}
                    onChange={handleChange}
                    disabled={!selectedItem.title}
                  />
                </label>
                <label>
                  Description:
                  <textarea
                    name="description"
                    value={selectedItem.description || selectedItem.cent}
                    onChange={handleChange}
                    disabled={!selectedItem.title}
                  />
                </label>
                <label>
                  Location:
                  <input
                    type="text"
                    name="location"
                    value={selectedItem.location || ''}
                    onChange={handleChange}
                    disabled={!selectedItem.title}
                  />
                </label>
                <label>
                  Estimated Price:
                  <input
                    type="text"
                    name="estimatedPrice"
                    value={selectedItem.estimatedPrice || selectedItem.estimatedAmount}
                    onChange={handleChange}
                  />
                </label>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
              </form>
            ) : (
              <div>
                <h2>{selectedItem.title || selectedItem.category} Details</h2>
                <p><strong>Description:</strong> {selectedItem.description || selectedItem.cent}</p>
                {selectedItem.location && <p><strong>Location:</strong> {selectedItem.location}</p>}
                <p><strong>Estimated Price:</strong> {selectedItem.estimatedPrice || selectedItem.estimatedAmount}</p>
                <button onClick={handleEditClick}>Edit</button>
                <button onClick={handleDeleteClick}>Delete</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HouseList;
