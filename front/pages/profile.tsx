import React from 'react';

import Head from 'next/head';

import BaseLayout from '@layouts/BaseLayout';
import Profile from '@views/Profile';

export interface IProps {
  title: string;
}

const ProfilePage = ({ title }: IProps) => {
  return (
    <BaseLayout>
      <Head>
        <title>{title}</title>
      </Head>
      <Profile />
    </BaseLayout>
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
