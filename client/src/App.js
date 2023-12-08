import React, { useState, useEffect } from 'react';
import StravaAuth from './components/Auth';

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activities, setActivities] = useState([])

  //Strava Credentials
  let clientID = "116117";
  let clientSecret = "7f89a27c089e141e58680835f46530d5ae34b0d6";
  let id =1188418
  let access_token = "a2e453e3ea7629e91184c868ce6cbcc39a289aab";
  // refresh token and call address
  const refreshToken = "12b5606900d078cff2435c7617e95c37d4318912";
  const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`
  
  // endpoint for read-all activities. temporary token is added in getActivities()
  const callActivities = `https://www.strava.com/api/v3/athlete/activities`
  //const callActivities = `https://www.strava.com/api/v3/clubs/${id}/activities`

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
      .then((data) =>{
        setActivities(data)
        setIsLoading(false)
      } )
      .catch(e => console.log(`err ${e}`))
  }

  function showActivities(){
    if(isLoading) return <>LOADING...</>
    if(!isLoading) {
      console.log(activities)
      return activities.length
      
    }
  }

  // Format the date using the Date object
  function formatStartDate(startDate) {
    const date = new Date(startDate);
    return date.toLocaleString(); // Adjust the formatting as needed
  }

  return (
    <div className="App">
      {showActivities()}
      {activities.map((user,i)=>(
        <p key={i}>
          {`${user.name} :-` }
          {formatStartDate(user.start_date)}
        </p>
      ))}
      <StravaAuth /> 
    </div>
  );
 
}

export default App;

//c408ada0df370c464e2fbb66925beac4dec0ccb7
