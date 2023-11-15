import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { getUserById, getWishlistByUserId, getMoviesByUserId } from '../../lib/db';

const Profile = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);

  console.log("router.query", router.query)

  useEffect(() => {
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
      <div key={movie.imdb_id}>
        <p>Title: {movie.title}</p>
      </div>
    ))}
    </div>
  );
};

export default Profile;
