import { RootState } from '@modules/store/slices';

// Select
const postSelector = {
  list: (state: RootState) => state.POST.list,
  infiniteList: (state: RootState) => state.POST.infiniteList,
  data: (state: RootState) => state.POST.data,
};

export default postSelector;
