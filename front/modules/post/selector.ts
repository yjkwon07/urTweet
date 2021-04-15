import { RootState } from '@modules/store/slices';

// Select
const postSelector = {
  list: (state: RootState) => state.POST.list,
  data: (state: RootState) => state.POST.data,
};

export default postSelector;
