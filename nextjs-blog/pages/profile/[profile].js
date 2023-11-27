import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
// import { getUserById, getWishlistByUserId, getMoviesByUserId } from '../../lib/db';
import utilStyles from '../../styles/utils.module.css'
import { useSession } from 'next-auth/react';

const Profile = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    console.log('Session status:', status);
    console.log('Session data:', session);

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`/api/auth/user/${router.query.profile}`);

        if (response.ok) {
          const userProfileData = await response.json();
          console.log('userProfileData profile', userProfileData)
          setUserProfile(userProfileData);
        } else {
          console.error('Failed to fetch user profile. Server returned:', response.status, response.statusText);
          const errorResponse = await response.text();
          console.error('Server response:', errorResponse);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (router.query.profile) {
      fetchUserProfile();
    }
  }, [router.query.profile]);

  if (!userProfile || !userProfile.user) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div >
      <h1>Hiii {userProfile.user.first_name}!</h1>

      <h2>Your Wishlist</h2>
      {userProfile.wishlist.map((item) => (
        <div key={item.id}>
          <p>Movie ID: {item.movie_id}</p>
        </div>
      ))}

      <h2>Your Movies</h2>
      {userProfile.movies.map((movie) => (
      <div key={movie.imdb_id}>
        <p>Title: {movie.title}</p>
        <p>Title: {movie.overview}</p>
      </div>
    ))}
    </div>
    </Layout>
    
  );
};

export default Profile;

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { getUserById, getWishlistByUserId, getMoviesByUserId } from '../../lib/db';

// const Profile = () => {
//   const router = useRouter();
//   const [userData, setUserData] = useState(null);
//   const [wishlist, setWishlist] = useState([]);
//   const [moviesInWishlist, setMoviesInWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         if (router.query.userId) {
//           const userId = parseInt(router.query.userId);
//           const user = await getUserById(userId);
//           const wishlistData = await getWishlistByUserId(userId);
//           const imdbIds = wishlistData.map(item => item.movie_id);
//           const moviesData = await getMoviesByUserId(imdbIds);

//           setUserData(user);
//           setWishlist(wishlistData);
//           setMoviesInWishlist(moviesData);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         // Handle the error as needed
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [router.query.userId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Your Profile</h1>
//       {userData && (
//         <div>
//           <p>ID: {userData.id}</p>
//           <p>Name: {userData.first_name} {userData.last_name}</p>
//           <p>Email: {userData.email}</p>
//         </div>
//       )}

//       <h2>Wishlist</h2>
//       {wishlist.length > 0 ? (
//         <ul>
//           {moviesInWishlist.map(movie => (
//             <li key={movie.id}>
//               <p>Title: {movie.title}</p>
//               <p>Tagline: {movie.tagline}</p>
//               <p>Overview: {movie.overview}</p>
//               {/* Add more movie details as needed */}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Nothing added to the wishlist yet.</p>
//       )}
//     </div>
//   );
// };

// export default Profile;
