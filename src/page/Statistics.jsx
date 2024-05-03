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
          <div className='flex border-b pb-3 border-gray-800 py-5 px-3 w-full md:w-[80%] justify-between items-center m-auto'>
            <div className='flex flex-col justify-center md:items-center items-start'>
              <div className='w-[100px] md:w-[100px] flex justify-center text-center bg-white rounded-xl'>
                <img className='w-[50%] py-3 md:w-[90%]' src={match.competitions[0].competitors[0].team.logo} alt="" />
              </div>
              <p className='text-wrap text-xs md:text-[16px] mt-1'>{match.competitions[0].competitors[0].team.displayName}</p>
              {/* <p className='mt-6 text-xs text-gray-400'>{match.competitions[0].competitors[0].records[0].summary}</p> */}
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
              <div className='w-[100px] md:w-[100px] flex justify-center text-center bg-white rounded-xl'>
                <img className='w-[50%] py-3 md:w-[90%]' src={match.competitions[0].competitors[1].team.logo} alt="" />
              </div>
              <p className='flex flex-wrap text-xs md:text-[16px] mt-1'>{match.competitions[0].competitors[1].team.displayName}</p>
              {/* <p className='mt-6 text-xs text-gray-400'>{match.competitions[0].competitors[1].records[0].summary}</p> */}
            </div>
          </div>

          <div className='w-full md:w-[55%] m-auto mt-7'>
            <h1 className=' bg-gray-800 py-[2px] font-semibold pl-5'>
            ODDS
            </h1>
            <div>
              <div className='flex px-3 justify-between'>
              <div className='flex w-[50px] flex-col justify-between items-center'>
  <p className='mb-2 text-lg font-semibold'>1</p>
  <p className='text-sm'>
    {match.competitions && match.competitions[0] && match.competitions[0].odds && match.competitions[0].odds[0] && match.competitions[0].odds[0].awayTeamOdds && match.competitions[0].odds[0].awayTeamOdds.value !== undefined ? match.competitions[0].odds[0].awayTeamOdds.value : null}
  </p>
</div>

<div className='flex flex-col justify-center items-center'>
  <p className='mb-2 text-lg font-semibold'>X</p>
  <p className='text-sm'>
    {match.competitions && match.competitions[0] && match.competitions[0].odds && match.competitions[0].odds[0] && match.competitions[0].odds[0].drawOdds && match.competitions[0].odds[0].drawOdds.value !== undefined ? match.competitions[0].odds[0].drawOdds.value : null}
  </p>
</div>

<div className='flex flex-col justify-center items-center'>
  <p className='mb-2 text-lg font-semibold'>2</p>
  <p className='text-sm'>
    {match.competitions && match.competitions[0] && match.competitions[0].odds && match.competitions[0].odds[0] && match.competitions[0].odds[0].homeTeamOdds && match.competitions[0].odds[0].homeTeamOdds.value !== undefined ? match.competitions[0].odds[0].homeTeamOdds.value : null}
  </p>
</div>

              </div>
            </div>
          </div>
          <div className='w-full md:w-[55%] m-auto mt-28'>
            <h1 className=' bg-gray-800 mb-3 py-[2px] font-semibold pl-5'>
            
            </h1>
            <div>
              <div className='flex px-3 justify-between'>
                <div className='flex flex-row justify-start items-center'>
                <div className='w-[100px] md:w-[100px] flex justify-center text-center bg-white rounded-xl'>
                <img className='w-[50%] py-3 md:w-[90%]' src={match.competitions[0].competitors[0].team.logo} alt="" />
                  </div>
                  <div className='ml-3'>
                    <p className='text-xs md:text-sm font-semibold mb-2'>{match.competitions[0].competitors[0].team.displayName}</p>
                    <p className='text-sm'>{match.competitions[0].competitors[0].form}</p>
                    
                  </div>
                </div>

                <div className='flex flex-row justify-end items-center'>
                <div className='flex mr-3 flex-col justify-end items-end'>
                <p className='text-xs flex items-center mb-2 md:text-sm font-semibold'>{match.competitions[0].competitors[1].team.displayName}</p>
                <p className='text-sm'>{match.competitions[0].competitors[1].form}</p>
                </div>
                <div className='w-[100px] md:w-[100px] flex justify-center text-center bg-white rounded-xl'>
                <img className='w-[50%] py-3 md:w-[90%]' src={match.competitions[0].competitors[1].team.logo} alt="" />
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          <div className='w-full md:w-[55%] m-auto mt-28'>
            <h1 className=' bg-gray-800 mb-3 py-[2px] font-semibold pl-5'>
            STATISTICS
            </h1>
            <div>
              <div>
                
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Statistics;
