import React, { useState, useEffect } from 'react';

function Navbar() {
  const [leagueName, setLeagueName] = useState("");
  const [leagueLogo, setLeagueLogo] = useState("");

  useEffect(() => {
    fetchNavbarData();
  }, []); // Run once on component mount

  async function fetchNavbarData() {
    try {
      const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard');
      const data = await response.json();
      console.log(data); // Log the entire data object
      setLeagueName(data.leagues[0].name);
      setLeagueLogo(data.leagues[0].logos[0].href);
    } catch (error) {
      console.error('Error fetching navbar data:', error);
    }
  }

  return (
    <div className='mb-14 w-full flex justify-between items-center bg-red-700 px-7 md:px-28 py-7'>
      <div>
        <p className='text-3xl md:text-4xl font-semibold'>{leagueName}</p>
        <p>England</p>
      </div>
      <img className='w-[30%] md:w-[15%]' src={leagueLogo} alt="" />
    </div>
  );
}

export default Navbar;
