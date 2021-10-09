import React from 'react';

import { useReadMyUser } from '@modules/user';
import { getUserId } from '@utils/auth';

import LoginForm from '../LoginForm';
import UserProfile from '../UserProfile';
import UserSkeleton from '../UserSkeleton';

const UserStatusView = () => {
  const { status: myDataStatus, data: myData } = useReadMyUser();
  const isLogin = getUserId();

  return (
    <>
      {myData && <UserProfile />}
      {myDataStatus === 'LOADING' && <UserSkeleton />}
      {!isLogin && !myData && <LoginForm />}
    </>
  );
};

export default UserStatusView;
