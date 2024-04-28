import React, { useState, useEffect } from 'react';

function ScorePage() {
  const [matchData, setMatchData] = useState([]);
  const [leagueName, setLeagueName] = useState("");
  const [leagueLogo, setLeagueLogo] = useState("");

  useEffect(() => {
    fetchMatchData();
  }, []);

  async function fetchMatchData() {
    try {
      const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard');
      const data = await response.json();
      console.log(data); // Log the entire data object
      setMatchData(data.events); // Set the match data in state
      setLeagueName(data.leagues[0].name);
      setLeagueLogo(data.leagues[0].logos[0].href);
    } catch (error) {
      console.error('Error fetching match data:', error);
    }
  }

  // Function to convert UTC time to Nigeria time and include the day of the week
  function convertToNigeriaTimeWithDay(utcTime) {
    const options = { timeZone: 'Africa/Lagos', weekday: 'long', hour: 'numeric', minute: 'numeric' };
    const nigeriaTimeWithDay = new Date(utcTime).toLocaleString('en-US', options);
    return nigeriaTimeWithDay;
  }

  return (
    <div className='bg-black text-white'>
      <div className='mb-14 w-full flex justify-between items-center bg-red-700 px-7 md:px-28 py-7'>
        <div>
          <p className=' text-3xl md:text-4xl font-semibold'>{leagueName}</p>
          <p>England</p>
        </div>
        <img className='w-[30%] md:w-[15%]' src={leagueLogo} alt="" />
      </div>
      <ul>
        {matchData.map((match, index) => (
          <li key={index} className='mb-14 md:px-24 px-5 flex items-center justify-between'>
            <div className='flex flex-col w-full md:w-[350px] justify-center'>
              <div className='flex justify-between items-center mb-2'>
                <p className='font-bold'>{convertToNigeriaTimeWithDay(match.date)}</p>
                <p><a className='uppercase font-bold' href="/statistics">Statistics</a></p>
              </div>
              <div className='flex text-gray-400 mb-1 font-medium justify-between'>
                <p className='mr-7'>{match.status.type.description}</p>
                <p className='text-xs'>{match.competitions[0].status.displayClock}</p>
              </div>
              <div className='flex bg-slate-800 px-4 py-2'>
                <div className='flex items-center w-full md:w-[300px]'>
                  <img className='w-[40px] md:w-[9%] mr-2' src={match.competitions[0].competitors[0].team.logo} alt="" />
                  <div className='mr-5 text-nowrap'>
                    <p className='font-semibold text-nowrap text-gray-200 md:text-[16px]'>{match.competitions[0].competitors[0].team.displayName}</p>
                    <p className='text-xs mb-2'>{match.competitions[0].competitors[0].records[0].summary}</p>
                  </div>
                </div>
                <p className='flex justify-end'>{match.competitions[0].competitors[0].score}</p>
              </div>
              <div className='flex bg-slate-800 px-4'>
                <div className='flex items-center w-full md:w-[300px]'>
                  <img className='w-[40px] md:w-[9%] mr-2' src={match.competitions[0].competitors[1].team.logo} alt="" />
                  <div className='mr-5'>
                    <p className='font-semibold text-nowrap text-gray-200 md:text-[16px]'>{match.competitions[0].competitors[1].team.displayName}</p>
                    <p className='text-xs mb-2'>{match.competitions[0].competitors[1].records[0].summary}</p>
                  </div>
                </div>
                <p className='text-[16px]'>{match.competitions[0].competitors[1].score}</p>
              </div>
            </div>
            <p className='md:block hidden'>{match.venue.displayName}</p>
            <div className='text-[15px] md:block hidden'>
              <p><a className='uppercase' href="/statistics">Summary</a></p>
              <p><a className='uppercase' href="/statistics">Statistics</a></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScorePage;
