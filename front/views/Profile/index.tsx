import React, { VFC } from 'react';

import Head from 'next/head';
import { useSelector } from 'react-redux';

import AppLayout from '@layouts/App';
import { userSelector } from '@modules/user';

import FollowList from './FollowList';
import NicknameEditForm from './NicknameEditForm';

const Profile: VFC = () => {
  const myData = useSelector(userSelector.myData);

  if (!myData) return null;
  return (
    <>
      <Head>
        <title>내 프로필 | urTweet</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={myData.Followings} />
        <FollowList header="팔로워" data={myData.Followers} />
      </AppLayout>
    </>
  );
};

export default Profile;
