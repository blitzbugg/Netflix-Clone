import React from 'react'
import './Banner.css'
function Banner() {
  return (
    <div className='banner'>
      <div className="content">
        <h1 className="title">Movie Name</h1>
        <div className="banner-btns">
            <button className="btn">Play</button>
            <button className="btn">My list</button>
        </div>
        <h1 className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus excepturi quidem, quis id quia </h1>
      </div>
      <div className="fade-bottom"></div>
    </div>
  )
}

export default Banner
