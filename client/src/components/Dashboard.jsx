// DashboardComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardComponent = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Make a GET request to your server to fetch user data from Strava
    axios.get('http://localhost:3000/user/data').then((response) => {
      setUserData(response.data);
    });
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h2>Welcome, {userData.name}</h2>
          <p>Your Strava activities: {userData.activitiesCount}</p>
          {/* Display other user data as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default DashboardComponent;
