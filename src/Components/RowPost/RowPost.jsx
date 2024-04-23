import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import './RowPost.css'
import axios from '../../axios'
import {imageUrl,API_KEY } from '../../constants/constants'

function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [urlId,setUrlId] = useState('')
  useEffect(() => {
    axios.get(props.url).then(Response => {
      console.log(Response.data.results)
      setMovies(Response.data.results)
    })
  }, [])
  const opts = {
    height: '450',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleMovieTrailer = (id)=>{
    console.log(id)
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(Response=>{
      if(Response.data.results.length!==0){
        setUrlId(Response.data.results[0])
      }
      else{
        alert("Trailer not available");
      }
    })
  }

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((movie) => (
          <img onClick={()=>handleMovieTrailer(movie.id)} className={props.isSmall ? 'small-poster' : 'poster'} src={`${imageUrl+movie.backdrop_path}`} alt="poster" />
        ))}
      </div>
      { urlId && <YouTube videoId={urlId.key} opts={opts} />}
    </div>
  )
}

export default RowPost