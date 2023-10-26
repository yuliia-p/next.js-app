import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';


async function fetchPopularMovies() {
  const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
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
    console.error('Error fetching popular movies:', error);
    return null;
  }
}


import { useState, useEffect } from 'react';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // Initialize with page 1
  const router = useRouter();

  const loadNextPage = () => {
    // Increment the page number and update the state
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmUwODc0OGM2MDk2NTkxNTM2ODZkYWY0YWNkYWZlZSIsInN1YiI6IjY1MzAwZDUxMGI3NGU5MDEzODdmY2MwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ITePXKabQvQXZyZLELNVoPSedLn1m8cxLnxEGGrtalI',
          },
        };
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        console.log('data.results', data.results);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();
  }, [page]); // Fetch when the page state changes
  
  return (
    <Layout>
      <section>
        <ul className={utilStyles.moviesList}>
          {movies.map((movie) => (                
            <li key={movie.id} className={utilStyles.movieItem}>              
                <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title} />
                <p className={utilStyles.movieTitle}>Title: {movie.title}</p>
                <p className={utilStyles.movieRating}>Rating: {movie.vote_average}</p>
                <div className={utilStyles.movieInfo}>
                  <p className={utilStyles.movieOverview}>{movie.overview}</p>
                  {/* Add more movie details as needed */}
                </div>
                <button className={utilStyles.loadMoreButton}
                onClick={() => router.push(`/movie/${movie.id}`)}>More Details</button>
            </li>
          ))}
        </ul>
        <div className={utilStyles.loadMoreButtonDiv}>
          <button className={utilStyles.loadMoreButton} onClick={loadNextPage}>
            Load More
          </button>
        </div>
      </section>
    </Layout>
  );
}