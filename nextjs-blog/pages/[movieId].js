import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function MovieDetails() {
  const router = useRouter();
  console.log('router', router)

  const { movieId } = router.query;
  const [movieDetails, setMovieDetails] = useState(null);
  console.log('movieId', movieId)

  useEffect(() => {
    // Fetch movie details when the component mounts
    if (movieId) {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmUwODc0OGM2MDk2NTkxNTM2ODZkYWY0YWNkYWZlZSIsInN1YiI6IjY1MzAwZDUxMGI3NGU5MDEzODdmY2MwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ITePXKabQvQXZyZLELNVoPSedLn1m8cxLnxEGGrtalI',
        },
      };

      fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
        .then((response) => response.json())
        .then((data) => {
          setMovieDetails(data);
          console.log(data);
        })
        .catch((error) => {
          console.error('Error fetching movie details:', error);
        });
    }
  }, [movieId]);

  return (
    <div>
      <h1>Movie Details Page</h1>
      {movieDetails && (
        <div>
          <h2>{movieDetails.title}</h2>
          <p>Overview: {movieDetails.overview}</p>
          <p>Release Date: {movieDetails.release_date}</p>
          {/* Add more movie details as needed */}
        </div>
      )}
    </div>
  );
}
