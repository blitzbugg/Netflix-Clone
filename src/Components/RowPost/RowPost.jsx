import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import './RowPost.css';
import axios from '../../axios';
import { imageUrl, API_KEY } from '../../constants/constants';

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState('');
  const [error, setError] = useState(null); // Add state for errors

  useEffect(() => {
    axios.get(props.url).then(response => {
      setMovies(response.data.results);
    }).catch(error => {
      setError(error); // Handle API errors
    });
  }, [props.url]);

  const opts = {
    height: '450',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovieTrailer = async (id) => {
    try {
      const response = await axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US&video_type=trailer`);
      const trailerCandidates = response.data.results.length > 0 ?
        response.data.results.filter(video => {
          const title = video.name ? video.name.toLowerCase() : '';
          const description = video.description ? video.description.toLowerCase() : '';
          return (title.includes('trailer') || title.includes('official trailer')) ||
                 (description.includes('trailer') || description.includes('official trailer'));
        }) : [];

      if (trailerCandidates.length > 0) {
        setUrlId(trailerCandidates[0].key); // Choose the first trailer
      } else {
        alert("Trailer not available");
      }
    } catch (error) {
      setError(error); // Handle API errors
      console.error('Error fetching trailer:', error);
    }
  };

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleMovieTrailer(movie.id)}
            className={props.isSmall ? 'small-poster' : 'poster'}
            src={`${imageUrl}${movie.backdrop_path}`}
            alt="poster"
          />
        ))}
      </div>
      {urlId && <YouTube videoId={urlId} opts={opts} />}
      {error && !urlId && <div>Error fetching trailer: {error.message}</div>} {/* Display error message only if there's an error and no trailer */}
    </div>
  );
}

export default RowPost;
