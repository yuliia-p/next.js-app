import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css'

function MovieDetails() {
  const router = useRouter();
  const [movieDetails, setMovieDetails] = useState(null);

  const { id } = router.query; // Get the movie ID from the URL

  useEffect(() => {    
        // Fetch movie details when the component mounts
        if (id) {
          const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmUwODc0OGM2MDk2NTkxNTM2ODZkYWY0YWNkYWZlZSIsInN1YiI6IjY1MzAwZDUxMGI3NGU5MDEzODdmY2MwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ITePXKabQvQXZyZLELNVoPSedLn1m8cxLnxEGGrtalI',
            },
          };
    
          fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
            .then((response) => response.json())
            .then((data) => {
              setMovieDetails(data);
              console.log(data);
            })
            .catch((error) => {
              console.error('Error fetching movie details:', error);
            });
        }
      }, [id]);
    
      return (
        <Layout>
          <div>
          {movieDetails && (
            <div className={utilStyles.movieDetails}>
               <div>
                <img 
                style={{ width: '300px'}}
                src={`https://image.tmdb.org/t/p/w185${movieDetails.poster_path}`} 
                alt={movieDetails.title} />
              </div>
              <div style={{padding: '16px'}}>
                <h2 className={utilStyles.movieTitle}>{movieDetails.original_title}</h2>
                <h3>{movieDetails.tagline}</h3>
                <p>Overview: {movieDetails.overview}</p>
                <p>Release Date: {movieDetails.release_date}</p>
                <p>Genres: {movieDetails.genres.map(genre => genre.name).join(', ')}</p>
                <p>Runtime: {movieDetails.runtime} minutes</p>
              {/* Add more movie details as needed */}
              </div>
              
            </div>
          )}
        </div>
        </Layout> 
      );
}

export default MovieDetails;
