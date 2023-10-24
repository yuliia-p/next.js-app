import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  // Fetch popular movies data here
  const popularMovies = await fetchPopularMovies();

  return {
    props: {
      allPostsData,
      popularMovies,
    },
  };
}

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

// export default function Home({ allPostsData, popularMovies }) {
//   console.log('popularMovies.results', popularMovies.results)
//   return (
//     <Layout home>
//       <Head>
//         <title>{siteTitle}</title>
//       </Head>
//       <section className={utilStyles.headingMd}>
//         <p>Hello, I'm Yuliia. I am a graduate of a Full-Immersion Web Development Program with a passion for web development and graphic design.</p>
//         <p>I have freelance experience as a Web Developer, specializing in WordPress and Shopify. I am excited to apply my knowledge and learn more in the field, having built a strong foundation in design principles and programming languages.</p>
//         <p>
//           (This is a sample website - you’ll be building a site like this on{' '}
//           <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
//         </p>
//         <Link href="/posts/first-post">Check this page!</Link>
//       </section>
//       <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
//         <h2 className={utilStyles.headingLg}>Blog</h2>
//         <ul className={utilStyles.list}>
//           {allPostsData.map(({ id, date, title }) => (
//             <li className={utilStyles.listItem} key={id}>
//               {title}
//               <br />
//               {id}
//               <br />
//               {date}
//             </li>
//           ))}
//         </ul>
//       </section>
//       <section>
//       <section>
//       <div>
//       <h1>Top Rated Movies:</h1>
//         <ul>
//           {popularMovies.results.map((movie) => (
//             <li key={movie.id}>
//             <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title} />
//             <p>Title: {movie.title}</p>
//             <p>Rating: {movie.vote_average}</p>
//             {/* Add more movie details as needed */}
//           </li>
//         ))}
//       </ul>
//     </div>
//       </section>
//       </section>
//     </Layout>
//   );
// }
import { useState, useEffect } from 'react';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // Initialize with page 1

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
          <p className={utilStyles.movieRating}>Rating: {movie.vote_average}</p>
          <div className={utilStyles.movieInfo}>
            <p className={utilStyles.movieTitle}>Title: {movie.title}</p>
            <p className={utilStyles.movieOverview}>{movie.overview}</p>
            {/* Add more movie details as needed */}
          </div>
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
