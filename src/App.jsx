import React, { useState, useEffect } from 'react';

function App() {
  const [matchData, setMatchData] = useState([]);
  const [matchOfTheDay, setMatchOfTheDay] = useState(null);

  useEffect(() => {
    fetchMatchData();
  }, []);

  async function fetchMatchData() {
    try {
      const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard');
      const data = await response.json();
      console.log(data); // Log the entire data object
      setMatchData(data.events); // Set the match data in state
      findMatchOfTheDay(data.events); // Find the match of the day
    } catch (error) {
      console.error('Error fetching match data:', error);
    }
  }

  function findMatchOfTheDay(events) {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
    const matchToday = events.find(event => event.date === today);
    setMatchOfTheDay(matchToday);
  }

  // Function to convert UTC time to Nigeria time and include the day of the week
  function convertToNigeriaTimeWithDay(utcTime) {
    const options = { timeZone: 'Africa/Lagos', weekday: 'long', hour: 'numeric', minute: 'numeric' };
    const nigeriaTimeWithDay = new Date(utcTime).toLocaleString('en-US', options);
    return nigeriaTimeWithDay;
  }

  return (
    <div className='bg-black text-white'>
      <div className='mb-14 w-full bg-red-700 px-8 py-7'>
              <p className='text-3xl font-semibold'>Premier League</p>
              <p>England</p>
            </div>
      <ul>
        
        {matchData.map((match, index) => (
          <li key={index} className='mb-14 md:px-24 px-5 flex items-center justify-between'>
            
            <div className='flex flex-col justify-center'>
              <p className='font-bold mb-2'>{convertToNigeriaTimeWithDay(match.date)}</p>
              <div className='flex  text-gray-400 mb-1 font-medium item justify-between'>
                <p className='mr-7'>{match.status.type.description }</p>
                <p className=' text-xs'>{match.competitions[0].status.displayClock}</p>

             </div>
              <div className='flex bg-slate-800 px-4 py-2'>
              <div className='flex items-center w-[60%] md:w-[300px]'>
                <img className='w-[9%] mr-2' src={match.competitions[0].competitors[0].team.logo} alt="" />
                <div className='mr-5 text-nowrap'>
                  <p className='font-semibold text-gray-200 text-[16px]'>{match.competitions[0].competitors[0].team.displayName}</p>
                  <p className='text-xs mb-2'>{match.competitions[0].competitors[0].records[0].summary}</p>
                </div>
                </div>
                <p className='flex justify-end'>{match.competitions[0].competitors[0].score}</p>
              </div>

              <div className='flex bg-slate-800 px-4'>
              <div className=' flex items-center w-[60%] md:w-[300px]'>
                <img className='w-[9%] mr-2' src={match.competitions[0].competitors[1].team.logo} alt="" />
                <div className='mr-5'>
                  <p className='font-semibold text-gray-200 text-[16px]'>{match.competitions[0].competitors[1].team.displayName}</p>
                  <p className='text-xs mb-2'>{match.competitions[0].competitors[1].records[0].summary}</p>
                </div>
                
                </div>
                <p className='text-[16px]'>{ match.competitions[0].competitors[1].score}</p>
              </div>
            </div>

            <p>{match.venue.displayName}</p>
            <div className='text-[15px]'>
                  <p><a className=' uppercase' href="">Summary</a></p>
                  <p><a className=' uppercase' href="">Statistics</a></p>
                </div>
            
          </li>
        ))}
      </ul>
      {/* {matchOfTheDay && (
        <div>
          <h2>Match of the Day</h2>
          <p>Date: {matchOfTheDay.date}</p>
          <p>Score: {matchOfTheDay.score}</p>
        </div>
      )} */}
    </div>
  );
}

export default App;
