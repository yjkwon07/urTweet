import { RootState } from '@modules/store/slices';

const postSelector = {
  list: (state: RootState) => state.POST.list,
  infinitePost: (state: RootState) => state.POST.infinitePost,
  infiniteUserPost: (state: RootState) => state.POST.infiniteUserPost,
  infiniteHashTagPost: (state: RootState) => state.POST.infiniteHashTagPost,
  data: (state: RootState) => state.POST.data,
};

export default postSelector;
