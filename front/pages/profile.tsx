import Head from 'next/head';

import Profile from '@views/Profile';

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>프로필 | urTweet</title>
      </Head>
      <Profile />
    </>
  );
};

export default ProfilePage;
