import { RootState } from '@modules/store/slices';

// Select
const userSelector = {
  myData: (state: RootState) => state.USER.MyInfo,
  followListData: (state: RootState) => state.USER.MyInfo?.Followers,
  followingListData: (state: RootState) => state.USER.MyInfo?.Followings,
};

export default userSelector;
