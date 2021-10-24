import React from 'react';

import { FetchStatus } from '@modules/fetchStatus';
import { useReadMyUser } from '@modules/user';
import { getUserId } from '@utils/auth';

import LoginForm from '../LoginForm';
import UserProfile from '../UserProfile';
import UserSkeleton from '../UserSkeleton';

const isShowUserSkeleton = (status: FetchStatus) => status === 'LOADING';
const isShowUserProfile = (status: FetchStatus, isLogin: boolean) => status !== 'LOADING' && isLogin;
const isShowLoginForm = (status: FetchStatus, isLogin: boolean, isPrevLogin: boolean) =>
  status !== 'LOADING' && !isLogin && !isPrevLogin;

const UserStatusView = () => {
  const { status: myDataStatus, data: myData } = useReadMyUser();
  const isPrevLogin = getUserId();

  return (
    <>
      {isShowUserSkeleton(myDataStatus) && <UserSkeleton />}
      {isShowUserProfile(myDataStatus, !!myData) && <UserProfile />}
      {isShowLoginForm(myDataStatus, !!myData, !!isPrevLogin) && <LoginForm />}
    </>
  );
};

export default UserStatusView;
