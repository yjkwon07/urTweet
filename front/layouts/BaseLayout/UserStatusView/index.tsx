import React from 'react';

import { useReadMyUser } from '@modules/user';

import LoginForm from '../LoginForm';
import UserProfile from '../UserProfile';
import UserSkeleton from '../UserSkeleton';

const UserStatusView = () => {
  const { status: myDataStatus, data: myData } = useReadMyUser();

  return (
    <>
      {myDataStatus === 'LOADING' && <UserSkeleton />}
      {myDataStatus !== 'LOADING' && myData ? <UserProfile /> : <LoginForm />}
    </>
  );
};

export default UserStatusView;
