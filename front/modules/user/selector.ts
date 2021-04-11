import { RootState } from '@modules/store/configStore';

// Select
const userSelector = {
  myData: (state: RootState) => state.USER.MyInfo,
};

export default userSelector;
