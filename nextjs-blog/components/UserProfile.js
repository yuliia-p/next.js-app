// import React from 'react';

// const Profile = ({ userData }) => {
//   // userData.movies is an array containing the user's added movies
//   const addedMovies = userData.movies || [];

//   return (
//     <div>
//       <h1>User Profile</h1>
//       <p>Hello, {userData.first_name}</p>
//       <p>Email: {userData.email}</p>

//       {/* ... other content ... */}
//       <h2>Added Movies</h2>
//       {addedMovies.length > 0 ? (
//         <ul>
//           {addedMovies.map((movie, index) => (
//             <li key={index}>{movie}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No movies added yet.</p>
//       )}
//     </div>
//   );
// };

// export default Profile;
// components/UserProfile.js
import React from 'react';

const UserProfile = () => {
//  = 
// ({ userData }) 

  return (
    <div>
      <h2>User Information</h2>
      {/* <p>
        <strong>ID:</strong> {userData.id}
      </p>
      <p>
        <strong>Email:</strong> {userData.email}
      </p>
      <p>
        <strong>First Name:</strong> {userData.first_name}
      </p>
      <p>
        <strong>Last Name:</strong> {userData.last_name}
      </p> */}
      {/* Add more user information fields as needed */}
    </div>
  );
};

export default UserProfile;
