import { useReadMyUser } from '@modules/user';

import LoginForm from '../LoginForm';
import UserProfile from '../UserProfile';
import UserSkeleton from '../UserSkeleton';

const isShowUserSkeleton = (isValidating: boolean, isLogin: boolean) => isValidating && !isLogin;
const isShowUserProfile = (isLogin: boolean, isError: boolean) => isLogin && !isError;
const isShowLoginForm = (isValidating: boolean, isLogin: boolean, isError: boolean) =>
  (!isValidating && !isLogin) || isError;

const UserStatusView = () => {
  const { data: myData, isValidating, error } = useReadMyUser();

  return (
    <>
      {isShowUserSkeleton(isValidating, !!myData) && <UserSkeleton />}
      {isShowUserProfile(!!myData, !!error) && <UserProfile />}
      {isShowLoginForm(isValidating, !!myData, !!error) && <LoginForm />}
    </>
  );
};

export default UserStatusView;
