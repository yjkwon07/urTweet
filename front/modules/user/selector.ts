import { RootState } from '@modules/store/slices';

// Select
const userSelector = {
  myData: (state: RootState) => state.USER.MyInfo,
  userData: (state: RootState) => state.USER.user,
  followListData: (state: RootState) => state.USER.Followers,
  followingListData: (state: RootState) => state.USER.Followings,
};

export default userSelector;
