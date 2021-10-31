import React from 'react';

import Head from 'next/head';
import { END } from 'redux-saga';

import SEO from '@components/SEO';
import { postAction } from '@modules/post';
import wrapper from '@modules/store/configStore';
import { HOME_URL } from '@utils/urls';
import ListReadView from '@views/Post/ListRead';
import { parseQuery } from '@views/Post/ListRead/filterSearch';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>HOME | urTweet</title>
        <SEO title="urTweet Home" url={HOME_URL} description="urTweet Home page" name="urTweet Home" keywords="Home" />
      </Head>
      <ListReadView />
    </>
  );
};

// SSR
export const getServerSideProps = wrapper.getServerSideProps(async ({ store, query }) => {
  const { page, pageSize, hashtag } = parseQuery(query);
  const filter = { page, pageSize, hashtag };

  store.dispatch(postAction.changeSearchFilter({ filter }));
  await store.dispatch(postAction.fetchListReadPost.asyncThunk(filter));
  store.dispatch(END);
});

export default HomePage;
