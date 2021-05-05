import React from 'react';

import { END } from 'redux-saga';

import { infinteListReadPost } from '@modules/post';
import { DEAFULT_PAGE_SIZE } from '@modules/post/utils/constants';
import { wrapper } from '@modules/store/configStore';
import Home from '@views/Home';

const HomePage = () => {
  return <Home />;
};

// SSR
// https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  context.store.dispatch(infinteListReadPost.requset({ pageSize: DEAFULT_PAGE_SIZE }));
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default HomePage;
