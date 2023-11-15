import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
// import { getUserById, getWishlistByUserId, getMoviesByUserId } from '../../lib/db';
import utilStyles from '../../styles/utils.module.css'

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
