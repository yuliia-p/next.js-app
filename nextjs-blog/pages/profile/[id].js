// pages/profile/[id].js
import React from 'react';
import Profile from '../../components/Profile';
import Layout from '../../components/layout';

const UserProfilePage = ({ userData }) => {
  return (
    <Layout>
      <div>
        <h1>User Profile Page</h1>
        <Profile userData={userData} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    // Fetch user data based on the id (replace this with your actual data fetching logic)
    const response = await fetch(`http://localhost:3000/api/auth/user/${id}`);
    const userData = await response.json();

    console.log('userData:', userData);

    if (!response.ok) {
      throw new Error(userData.error || 'Failed to fetch user data');
    }

    return {
      props: {
        userData,
      },
    };
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

export default UserProfilePage;
