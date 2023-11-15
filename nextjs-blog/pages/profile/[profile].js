// Import required modules
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Import your database functions from lib/db.js
import { getUserById, getWishlistByUserId, getMoviesByUserId } from '../../lib/db';

// Your Profile component
const Profile = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get the user ID from the route parameter
        const userId = router.query.userId;

        // Fetch user profile data from the database
        const user = await getUserById(userId);
        const wishlist = await getWishlistByUserId(userId);
        const movieIds = wishlist.map((item) => item.movie_id);
        const movies = await getMoviesByUserId(movieIds);

        // Construct the user profile object
        const userProfileData = {
          user,
          wishlist,
          movies,
        };

        setUserProfile(userProfileData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    // Call the function to fetch user profile data when the component mounts
    if (router.query.userId) {
      fetchUserProfile();
    }
  }, [router.query.userId]);

  // Additional check for userProfile being null after the initial load
  if (!userProfile || !userProfile.user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Profile</h1>
      <p>ID: {userProfile.user.id}</p>
      <p>Name: {userProfile.user.first_name} {userProfile.user.last_name}</p>
      <p>Email: {userProfile.user.email}</p>

      <h2>Your Wishlist</h2>
      {userProfile.wishlist.map((item) => (
        <div key={item.id}>
          <p>Movie ID: {item.movie_id}</p>
        </div>
      ))}

      <h2>Your Movies</h2>
      {userProfile.movies.map((movie) => (
        <div key={movie.id}>
          <p>Title: {movie.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Profile;
