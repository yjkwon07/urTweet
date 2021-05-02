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
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  context.store.dispatch(infinteListReadPost.requset({ pageSize: DEAFULT_PAGE_SIZE }));
  context.store.dispatch(END);
  context.store.sagaTask.toPromise();
  return {
    props: {},
  };
});

export default HomePage;
