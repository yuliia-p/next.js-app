// // pages/profile.js
// import Layout from '../components/layout';

// function Profile() {
//   // You can fetch user data here

//   return (
//     <Layout>
//       <div>
//         <h1>User Profile</h1>
//         {/* Display user information here */}
//         <p>Name: John Doe</p>
//         <p>Email: john@example.com</p>

//         <h2>Added Movies</h2>
//         {/* Display the list of added movies here */}
//         <ul>
//           <li>Movie 1</li>
//           <li>Movie 2</li>
//           <li>Movie 3</li>
//         </ul>
//       </div>
//     </Layout>
//   );
// }

// export default Profile;
import Layout from '../components/layout';

function Profile({ userData }) {
  return (
    <div>
    <h1>User Profile</h1>
    <p>Hello, {userData.first_name}</p>
    <p>Email: {userData.email}</p>

    {/* ... other content ... */}
    <h2>Added Movies</h2>
    {/* Display the list of added movies here */}
      <ul>
        <li>Movie 1</li>
        <li>Movie 2</li>
        <li>Movie 3</li>
      </ul>
  </div>
  )
}


export default Profile;
