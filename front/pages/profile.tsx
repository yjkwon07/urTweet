import React from 'react';

import Head from 'next/head';

import AppLayout from '@layouts/App';
import Profile from '@views/Profile';

export interface IProps {
  title: string;
}

const ProfilePage = ({ title }: IProps) => {
  return (
    <AppLayout>
      <Head>
        <title>{title}</title>
      </Head>
      <Profile />
    </AppLayout>
  );
};

// Static Generation
export async function getStaticProps() {
  return {
    props: {
      title: `프로필 | urTweet`,
    },
  };
}

export default ProfilePage;
