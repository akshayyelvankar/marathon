import React, { useState, useEffect } from 'react';
import StravaAuth from './components/Auth';

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activities, setActivities] = useState([])

  //Strava Credentials
  let clientID = "116117";
  let clientSecret = "7f89a27c089e141e58680835f46530d5ae34b0d6";

  // refresh token and call address
  const refreshToken = "12b5606900d078cff2435c7617e95c37d4318912";
  const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`
  
  // endpoint for read-all activities. temporary token is added in getActivities()
  const callActivities = `https://www.strava.com/api/v3/athlete/activities`

  // Use refresh token to get current access token
  useEffect(() => {
    fetch(callRefresh, {
      method: 'POST'
    })
    .then(res => res.json())
    .then(result =>{ 
      console.log('Token Response:', result);
      getActivities(result.access_token)})
    .catch(error => console.error('Error refreshing token:', error));
  }, [callRefresh])

  // use current access token to call all activities
  function getActivities(access){
     console.log(callActivities + access)
      fetch(`${callActivities}?access_token=${access}`)
      .then(res => res.json())
      .then(data => setActivities(data), setIsLoading(false))
      .catch(e => console.log(`err ${e}`))
  }

  function showActivities(){
    if(isLoading) return <>LOADING</>
    if(!isLoading) {
      console.log(activities)
      return activities.length
      
    }
  }

  return (
    <div className="App">
      {showActivities()}
      {activities.map((user,i)=>(
        <p>{user.start_date
        }</p>
      ))}
      {/* <StravaAuth /> */}
    </div>
  );
 
}

export default App;