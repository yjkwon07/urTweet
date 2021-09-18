import React from 'react';

import { useMyUser } from '@modules/user';

import LoginForm from '../LoginForm';
import UserProfile from '../UserProfile';
import UserSkeleton from '../UserSkeleton';

const UserStatusView = () => {
  const { status: myDataStatus, data: myData } = useMyUser();

  if (myDataStatus === 'SUCCESS' || myData) return <UserProfile />;
  if (myDataStatus === 'LOADING') return <UserSkeleton />;
  if (myDataStatus === 'FAIL' || !myData) return <LoginForm />;
  return null;
};

export default UserStatusView;
