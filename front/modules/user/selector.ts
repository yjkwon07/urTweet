import { RootState } from '@modules/store/slices';

// Select
const userSelector = {
  myData: (state: RootState) => state.USER.MyInfo,
  userData: (state: RootState) => state.USER.user,
  followListData: (state: RootState) => state.USER.followerListData,
  followingListData: (state: RootState) => state.USER.followingListData,
};

export default userSelector;
