import React, { useEffect, useState } from 'react';

function NewsPage() {
  const [news, setNews] = useState([]);
  const [header, setHeader] = useState("");

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const getNews = await fetch("https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/news");
      const data = await getNews.json();
      console.log(data)
      setNews(data.articles);
      setHeader(data);
    } catch (err) {
      console.error(err.message);
    }
  }

  // Function to convert UTC date string to Nigeria time zone
  function convertToNigeriaTime(utcDateString) {
    const date = new Date(utcDateString);
    const nigeriaOffset = 1 * 60; // Nigeria is 1 hour ahead of UTC
    const nigeriaTime = new Date(date.getTime() + nigeriaOffset * 60000);
    return nigeriaTime.toLocaleString();
  }

  return (
    <div className='text-white w-[100%] m-auto items-center flex flex-col justify-center'>
      <h1 className='font-bold text-2xl md:text-3xl mb-[80px]'>{header.header}</h1>
      <ul className=' flex flex-wrap justify-center'>
        {news.map((article, index) => (
          <li className='md:w-[40%] mb-8 p-6' key={index}>
            <h1 className='text-lg md:text-xl font-semibold mb-3'>{article.headline}</h1>
            <img className='w-full mb-4' src={article.images[0].url} alt={article.images[0].name} />
            <p className='mb-6 text-sm md:text-base'>{article.description}</p>
            <p className='text-end text-sm text-gray-400'>{convertToNigeriaTime(article.lastModified)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsPage;
