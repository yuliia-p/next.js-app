import Head from 'next/head';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';


export async function getStaticProps() {
  // Fetch upcoming movies data here
  const upcomingMovies = await fetchUpcomingMovies();

  return {
    props: {
      upcomingMovies,
    },
  };
}

async function fetchUpcomingMovies() {
  const url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmUwODc0OGM2MDk2NTkxNTM2ODZkYWY0YWNkYWZlZSIsInN1YiI6IjY1MzAwZDUxMGI3NGU5MDEzODdmY2MwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ITePXKabQvQXZyZLELNVoPSedLn1m8cxLnxEGGrtalI'
    }
  };

  try {
    const response = await fetch(url, options); 
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    return null;
  }
}

export default function Upcoming({ upcomingMovies }) {
  return (
    <Layout>
      <div>
        <h1>Upcoming Movies</h1>
        <ul className={utilStyles.moviesList}>
          {upcomingMovies.results.map((movie) => (
            <li key={movie.id} className={utilStyles.movieItem}>
              <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title} />
              <p className={utilStyles.movieRating}>Rating: {movie.vote_average}</p>
              <div className={utilStyles.movieInfo}>
                <p className={utilStyles.movieTitle}>Title: {movie.title}</p>
                <p className={utilStyles.movieOverview}>{movie.overview}</p>
                
                {/* Add more movie details as needed */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
