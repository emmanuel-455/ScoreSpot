import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useEffect } from 'react';


function Statistics() {
  const [matchData, setMatchData] = useState([]);
  const [matchOfTheDay, setMatchOfTheDay] = useState(null);

    useEffect(() => {
        return () => {
          TeamData()
        };
    }, []);
  
  async function TeamData() {
    try {
      const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard');
      const data = await response.json();
      console.log(data); // Log the entire data object
      setMatchData(data.events); // Set the match data in state
      //setLeagueName(data.leagues[0].name);
      //setLeagueLogo(data.leagues[0].logos[0].href);
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
            <div className='flex w-full md:w-[100%] justify-between items-center m-auto'>
              <div className=' flex flex-col justify-center items-center'>
                <div  className='w-[60%] md:w-[20%] flex justify-center text-center bg-white rounded-xl'>
                <img className='w-[50%] py-3 md:w-[90%]' src={match.competitions[0].competitors[0].team.logo} alt="" />
              </div>
              <p className='text-wrap text-[14px] mt-1'>{match.competitions[0].competitors[0].team.displayName}</p>
              </div>
              <div>
                <div className='flex flex-col justify-center items-center'>
                  <p className='text-nowrap text-sm mb-3 font-semibold'>{convertToNigeriaTimeWithDay(match.date)}</p>
                  <div className='flex flex-col justify-center items-center'>
                    <p className='md:text-[40px] font-semibold mb-2'>{match.competitions[0].competitors[0].score} - {match.competitions[0].competitors[1].score}</p>
                    <div className='flex  text-gray-400 mb-1 font-medium item items-center justify-between'>
                <p className='mr-7 text-sm'>{match.status.type.description }</p>
                <p className=' text-xs'>{match.competitions[0].status.displayClock}</p>

              </div>
                  </div>
                </div>
              </div>
              <div className=' flex flex-col justify-center items-center'>
                <div  className='w-[60%] md:w-[20%] flex justify-center text-center bg-white rounded-xl'>
                <img className='w-[50%] py-3 md:w-[90%]' src={match.competitions[0].competitors[1].team.logo} alt="" />
              </div>
              <p className='flex flex-wrap text-[14px] mt-1'>{match.competitions[0].competitors[1].team.displayName}</p>
              </div>
            </div>
        </div>
      ))}
      
    </div>
  )
}

export default Statistics
