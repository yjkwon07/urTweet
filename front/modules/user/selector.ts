import { RootState } from '@modules/store/slices';

// Select
const userSelector = {
  myData: (state: RootState) => state.USER.MyInfo,
};

export default userSelector;
