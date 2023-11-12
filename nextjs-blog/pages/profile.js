function Profile({ userData }) {
  // Assuming userData.movies is an array containing the user's added movies
  const addedMovies = userData.movies || [];

  return (
    <div>
      <h1>User Profile</h1>
      <p>Hello, {userData.first_name}</p>
      <p>Email: {userData.email}</p>

      {/* ... other content ... */}
      <h2>Added Movies</h2>
      {addedMovies.length > 0 ? (
        <ul>
          {addedMovies.map((movie, index) => (
            <li key={index}>{movie}</li>
          ))}
        </ul>
      ) : (
        <p>No movies added yet.</p>
      )}
    </div>
  );
}

export default Profile;
