// MovieDetails.js

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import utilStyles from '../../styles/utils.module.css';
// import Layout from '../../components/layout';
// import { getSession } from 'next-auth/react';
// import { addToWatchlist, getMoviesByUserId } from '../../lib/db';

// function MovieDetails({ session }) {
//   const router = useRouter();
//   const [movieDetails, setMovieDetails] = useState(null);

//   console.log('session', session)

//   const { id } = router.query;
  
//   console.log('id', id)

//   useEffect(() => {
//     if (id) {
//       const options = {
//         method: 'GET',
//         headers: {
//           accept: 'application/json',
//           Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmUwODc0OGM2MDk2NTkxNTM2ODZkYWY0YWNkYWZlZSIsInN1YiI6IjY1MzAwZDUxMGI3NGU5MDEzODdmY2MwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ITePXKabQvQXZyZLELNVoPSedLn1m8cxLnxEGGrtalI', 
//         },
//       };

//       fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
//         .then((response) => response.json())
//         .then((data) => {
//           setMovieDetails(data);
//           console.log(data);
//         })
//         .catch((error) => {
//           console.error('Error fetching movie details:', error);
//         });
//     }
//   }, [id]);

//   const handleAddToWatchlist = async () => {
//     try {
//       if (movieDetails && session) {
//         const { id, original_title, tagline, overview, poster_path } = movieDetails;
//         const userId = session.user.id; // Extract user ID from the session
//         await addToWatchlist(userId, id, original_title, tagline, overview, poster_path);
//         const userMovies = await getMoviesByUserId([id]);
        
//         console.log('User Movies:', userMovies);
//       }
//     } catch (error) {
//       console.error('Error adding to Watchlist:', error);
//     }
//   };

//   return (
//     <Layout>
//       <div>
//         {movieDetails && (
//           <Movie
//             title={movieDetails.original_title}
//             tagline={movieDetails.tagline}
//             overview={movieDetails.overview}
//             posterPath={movieDetails.poster_path}
//             releaseDate={movieDetails.release_date}
//             genres={movieDetails.genres}
//             runtime={movieDetails.runtime}
//           />
//         )}
//         <button className={utilStyles.loadMoreButton} onClick={handleAddToWatchlist}>
//           Add to Watchlist
//         </button>
//       </div>
//     </Layout>
//   );
// }

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   return {
//     props: {
//       session,
//     },
//   };
// }

// export default MovieDetails;

// export const Movie = ({
//   title,
//   tagline,
//   overview,
//   posterPath,
//   releaseDate,
//   genres,
//   runtime,
// }) => {
//   return (
//     <div className={utilStyles.box}>
//       <div className={utilStyles.overlapGroup}>
//         <div className={utilStyles.imageContainer}>
//           <img
//             className={utilStyles.poster}
//             alt="Poster"
//             src={`https://image.tmdb.org/t/p/w185${posterPath}`}
//           />
//         </div>
//         <div className={utilStyles.overlap}>
//           <p className={utilStyles.tagline}>{tagline}</p>
//           <div className={utilStyles.title}>{title}</div>
//           <div className={utilStyles.textContainer}>
//             <p className={utilStyles.overview}>
//               <span className={utilStyles.textWrapper}>Overview</span>
//               <span className={utilStyles.span}>: {overview}</span>
//             </p>
//             <p className={utilStyles.runtime}>
//               <span className={utilStyles.textWrapper}>Runtime</span>
//               <span className={utilStyles.span}>: {runtime} minutes</span>
//             </p>
//             <div className={utilStyles.div}>
//               <p className={utilStyles.genres}>
//                 <span className={utilStyles.textWrapper}>Genres</span>
//                 <span className={utilStyles.span}>
//                   : {genres.map((genre) => genre.name).join(', ')}
//                 </span>
//               </p>
//               <p className={utilStyles.releaseDate}>
//                 <span className={utilStyles.textWrapper}>Release Date</span>
//                 <span className={utilStyles.span}>: {releaseDate}</span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };



import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import utilStyles from '../../styles/utils.module.css'
import Layout from '../../components/layout';

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
      
        {movieDetails && (
          <Movie
            title={movieDetails.original_title}
            tagline={movieDetails.tagline}
            overview={movieDetails.overview}
            posterPath={movieDetails.poster_path}
            releaseDate={movieDetails.release_date}
            genres={movieDetails.genres}
            runtime={movieDetails.runtime}
          />
        )}
      
    </Layout>
      );
}

export default MovieDetails;


export const Movie = ({
  title,
  tagline,
  overview,
  posterPath,
  releaseDate,
  genres,
  runtime,
}) => {
  return (
    <div className={utilStyles.box}>
      <div className={utilStyles.overlapGroup}>
    <div className={utilStyles.imageContainer}>
      <img
        className={utilStyles.poster}
        alt="Poster"
        src={`https://image.tmdb.org/t/p/w185${posterPath}`}
      />
    </div>
    <div className={utilStyles.overlap}>
      <div className={utilStyles.title}>{title}</div>
      <p className={utilStyles.tagline}>{tagline}</p>
      <div className={utilStyles.textContainer}>
      <p className={utilStyles.overview}>
        <span className={utilStyles.textWrapper}>Overview</span>
        <span className={utilStyles.span}>: {overview}</span>
      </p>
      <p className={utilStyles.runtime}>
        <span className={utilStyles.textWrapper}>Runtime</span>
        <span className={utilStyles.span}>: {runtime} minutes</span>
      </p>
      <div className={utilStyles.div}>
        <p className={utilStyles.genres}>
          <span className={utilStyles.textWrapper}>Genres</span>
          <span className={utilStyles.span}>
            : {genres.map((genre) => genre.name).join(', ')}
          </span>
        </p>
        <p className={utilStyles.releaseDate}>
          <span className={utilStyles.textWrapper}>Release Date</span>
          <span className={utilStyles.span}>: {releaseDate}</span>
        </p>
      </div>
      <button className={utilStyles.loadMoreButton}>
        Add to Watchlist
      </button>
    </div>
    </div>
    </div>
      
    </div>
  );
};
