// pages/api/watchlist.js

import { addToWatchlist } from '../../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Assuming the request contains the necessary data to add to the watchlist
    const { userId, movieId, title, tagline, overview, posterPath } = req.body;

    try {
      // Call the addToWatchlist function from lib/db.js
      await addToWatchlist(userId, movieId, title, tagline, overview, posterPath);

      res.status(200).json({ message: 'Added to watchlist successfully' });
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
