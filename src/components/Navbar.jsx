import React, { useState } from 'react'
import { useEffect } from 'react';

function Navbar() {
  const [leagueName, setLeagueName] = useState("");
  const [leagueLogo, setLeagueLogo] = useState("");

  async function NavbarData() {
    try {
      const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard');
      const data = await response.json();
      console.log(data); // Log the entire data object
      //setMatchData(data.events); // Set the match data in state
      setLeagueName(data.leagues[0].name);
      setLeagueLogo(data.leagues[0].logos[0].href);
      //findMatchOfTheDay(data.events); // Find the match of the day
    } catch (error) {
      console.error('Error fetching match data:', error);
    }
  }

  useEffect(() => {
    return () => {
      NavbarData()
    };
  }, []);

  return (
    <div className='mb-14 w-full flex justify-between items-center bg-red-700 px-7 md:px-28 py-7'>
        <div>
          <p className=' text-3xl md:text-4xl font-semibold'>{leagueName}</p>
          <p>England</p>
        </div>
        <img className='w-[30%] md:w-[15%]' src={leagueLogo} alt="" />
      </div>
  )
}

export default Navbar
