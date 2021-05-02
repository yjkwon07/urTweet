import { RootState } from '@modules/store/slices';

import { infinteListReadPost } from './slice';

const postSelector = {
  list: (state: RootState) => state.POST.list,
  infiniteList: (state: RootState) => ({
    status: state.FETCH_STATUS[infinteListReadPost.TYPE]?.status,
    fetchData: state.FETCH_STATUS[infinteListReadPost.TYPE]?.data,
    data: state.POST.infiniteList,
  }),
  data: (state: RootState) => state.POST.data,
};

export default postSelector;
