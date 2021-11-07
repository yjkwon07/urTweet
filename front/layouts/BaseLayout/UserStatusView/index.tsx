import { FetchStatus } from '@modules/fetchStatus';
import { useReadMyUser } from '@modules/user';
import { getUserId } from '@utils/auth';

import LoginForm from '../LoginForm';
import UserProfile from '../UserProfile';
import UserSkeleton from '../UserSkeleton';

const isShowUserSkeleton = (status: FetchStatus) => status === 'LOADING';
const isShowUserProfile = (status: FetchStatus) => status === 'SUCCESS';
const isShowLoginForm = (status: FetchStatus, isPrevLogin: boolean) =>
  (status === 'INIT' && !isPrevLogin) || status === 'FAIL';

const UserStatusView = () => {
  const { status: myDataStatus } = useReadMyUser();
  const userId = getUserId();

  return (
    <>
      {isShowUserSkeleton(myDataStatus) && <UserSkeleton />}
      {isShowUserProfile(myDataStatus) && <UserProfile />}
      {isShowLoginForm(myDataStatus, !!userId) && <LoginForm />}
    </>
  );
};

export default UserStatusView;
