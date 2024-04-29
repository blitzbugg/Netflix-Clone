import React, { useEffect, useState } from 'react'
import {API_KEY,imageUrl} from '../../constants/constants'
import axios from '../../axios'
import './Banner.css'
function Banner() {
  const [movie, setMovie] = useState([])
        useEffect(() => {
    const intervalId = setInterval(() => {
      axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((Response)=>{
        const randomIndex = Math.floor(Math.random() * Response.data.results.length)
        setMovie(Response.data.results[randomIndex])
        console.log(intervalId)
      })
    }, 10000) // Change the banner every 10 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [])  

     
  return (
    <div
    style={{backgroundImage:`url(${movie ? imageUrl+movie.backdrop_path : ""})`}}
     className='banner'>
      <div className="content">
        <h1 className="title">{movie.name || movie.title}</h1>
        <div className="banner-btns">
            <button className="btn">Play</button>
            <button className="btn">My list</button>
        </div>
        <h1 className="description">{movie ? movie.overview : ""}</h1>
      </div>
      <div className="fade-bottom"></div>
    </div>
  )
}

export default Banner
