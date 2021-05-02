import React from 'react';

import { END } from 'redux-saga';

import { readPost } from '@modules/post';
import { wrapper } from '@modules/store/configStore';
import PostRead from '@views/Post/Read';

const PostPage = () => {
  return <PostRead />;
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  if (context.params?.id) context.store.dispatch(readPost.requset({ postId: Number(context.params.id) }));
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default PostPage;
