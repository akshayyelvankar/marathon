// StravaAuth.js

import React from 'react';

const StravaAuth = () => {
  const handleStravaAuth = () => {
    window.location.href = 'http://localhost:3000/auth/strava'; // Adjust the URL to match your server
  };

  return (
    <div>
      <h2>Strava Authentication</h2>
      <button onClick={handleStravaAuth}>Authorize with Strava</button>
      <a href='https://www.strava.com/oauth/authorize?client_id=116117&redirect_uri=http://localhost:5000/&response_type=code&scope=read_all,activity:read_all'>Connect</a>
    </div>
  );
};

export default StravaAuth;
