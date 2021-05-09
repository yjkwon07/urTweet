import React from 'react';

import { END } from 'redux-saga';

import { listReadHashTagPost } from '@modules/post';
import { DEAFULT_PAGE_SIZE } from '@modules/post/utils/constants';
import { wrapper } from '@modules/store/configStore';
import HashtagListRead from '@views/Hashtag/List';

const HashtagListReadPage = () => {
  return <HashtagListRead />;
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  if (context.params?.tag) {
    context.store.dispatch(
      listReadHashTagPost.requset({ hashtag: context.params.tag as string, pageSize: DEAFULT_PAGE_SIZE }),
    );
  }
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default HashtagListReadPage;
