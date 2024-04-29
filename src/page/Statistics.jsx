import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Statistics() {
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

  function convertToNigeriaTimeWithDay(utcTime) {
    const options = { timeZone: 'Africa/Lagos', weekday: 'long', hour: 'numeric', minute: 'numeric' };
    const nigeriaTimeWithDay = new Date(utcTime).toLocaleString('en-US', options);
    return nigeriaTimeWithDay;
  }

  return (
    <div className='text-white'>
      <Navbar />
      {matchData.map((match, index) => (
        <div className='m-auto' key={index}>
          <div className='flex border-b pb-3 border-gray-800 py-5 px-3 w-full md:w-[100%] justify-between items-center m-auto'>
            <div className='flex flex-col justify-center md:items-center items-start'>
              <div className='w-[60%] md:w-[20%] flex justify-center text-center bg-white rounded-xl'>
                <img className='w-[50%] py-3 md:w-[90%]' src={match.competitions[0].competitors[0].team.logo} alt="" />
              </div>
              <p className='text-wrap text-xs md:text-[16px] mt-1'>{match.competitions[0].competitors[0].team.displayName}</p>
              <p className='mt-6 text-xs text-gray-400'>{match.competitions[0].competitors[0].records[0].summary}</p>
            </div>
            <div>
              <div className='flex flex-col justify-center items-center'>
                <p className='text-nowrap text-sm mb-2 font-semibold'>{convertToNigeriaTimeWithDay(match.date)}</p>
                <div className='flex flex-col justify-center items-center'>
                  <p className='md:text-[40px] font-semibold mb-2'>{match.competitions[0].competitors[0].score} - {match.competitions[0].competitors[1].score}</p>
                  <div className='flex  text-gray-400 mb-1 font-medium item items-center justify-between'>
                    <p className='mr-3 text-sm'>{match.status.type.description}</p>
                    <p className='text-xs'>{match.competitions[0].status.displayClock}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-center md:items-center items-end'>
              <div className='w-[60%] md:w-[20%] flex justify-center text-center bg-white rounded-xl'>
                <img className='w-[50%] py-3 md:w-[90%]' src={match.competitions[0].competitors[1].team.logo} alt="" />
              </div>
              <p className='flex flex-wrap text-xs md:text-[16px] mt-1'>{match.competitions[0].competitors[1].team.displayName}</p>
              <p className='mt-6 text-xs text-gray-400'>{match.competitions[0].competitors[1].records[0].summary}</p>
            </div>
          </div>

          <div>
            okkk
          </div>
        </div>
      ))}
    </div>
  );
}

export default Statistics;
