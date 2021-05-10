import React from 'react';

import { END } from 'redux-saga';

import { listReadHashTagPost } from '@modules/post';
import { DEAFULT_PAGE_SIZE } from '@modules/post/utils/constants';
import { wrapper } from '@modules/store/configStore';
import HashtagListRead from '@views/Hashtag/List';

const HashtagListReadPage = () => {
  return <HashtagListRead />;
};

// SSR
export const getServerSideProps = wrapper.getServerSideProps(async ({ params, store }) => {
  if (params?.tag) {
    await store.dispatch(
      listReadHashTagPost.asyncTunk({ hashtag: params.tag.toString(), pageSize: DEAFULT_PAGE_SIZE }),
    );
    store.dispatch(END);
  }
});

export default HashtagListReadPage;
