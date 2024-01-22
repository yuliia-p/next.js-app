// pages/api/auth/user/[userId].js

import { getUserById, getWishlistByUserId, getMoviesByUserId } from '../../../../lib/db';

export default async function handler(req, res) {
  try {
    const { userId } = req.query;
    console.log('req.query', req.query)

    // Validate that userId is present and is a valid integer
    if (!userId || isNaN(parseInt(userId))) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    console.log('Fetching user profile for userId:', userId);
    const user = await getUserById(userId);

    // Handle case where user is not found
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch wishlist for the user
    const wishlist = await getWishlistByUserId(userId);

    // Fetch movies based on the wishlist
    const movieIds = wishlist.map((item) => item.movie_id);
    const movies = await getMoviesByUserId(movieIds);

    // Combine user, wishlist, and movie data
    const userProfile = {
      user,
      password,
      wishlist,
      movies,
    };

    res.status(200).json(userProfile);
    
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
