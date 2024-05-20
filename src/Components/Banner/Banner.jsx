import React, { useEffect, useState } from 'react';
import { API_KEY, imageUrl } from '../../constants/constants';
import axios from '../../axios';
import './Banner.css';

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchRandomMovie = async () => {
      try {
        const response = await axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`);
        const randomIndex = Math.floor(Math.random() * response.data.results.length);
        setMovie(response.data.results[randomIndex]);
      } catch (error) {
        console.error('Error fetching the movie:', error);
      }
    };

    fetchRandomMovie(); // Fetch a random movie immediately when the component mounts

    const intervalId = setInterval(fetchRandomMovie, 10000); // Change the banner every 10 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      style={{ backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : "https://wallpaperaccess.com/full/6075689.png"})` }}
      className='banner'>
      <div className="content">
        <h1 className="title">{movie ? movie.name || movie.title : ""}</h1>
        <div className="banner-btns">
          <button className="btn">Play</button>
          <button className="btn">My list</button>
        </div>
        <h1 className="description">{movie ? movie.overview : ""}</h1>
      </div>
      <div className="fade-bottom"></div>
    </div>
  );
}

export default Banner;