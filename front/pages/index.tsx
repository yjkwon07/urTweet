import React from 'react';

import Head from 'next/head';
import { END } from 'redux-saga';

import SEO from '@components/SEO';
import { postAction } from '@modules/post';
import { searchFilterAction } from '@modules/searchFilter';
import wrapper from '@modules/store/configStore';
import { HOME_URL } from '@utils/urls';
import ListReadView from '@views/Post/ListRead';
import { ViewMode } from '@views/Post/ListRead/filterSearch';

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
  const mode = (query.mode as ViewMode) || 'infinite';
  const page = Number(query.page) && mode !== 'infinite' ? Number(query.page) : 1;
  const pageSize = Number(query.pageSize) || 10;
  const hashtag = (query.hashtag as string) || '';
  const filter = {
    page,
    pageSize,
    hashtag,
  };

  store.dispatch(searchFilterAction.changeSearchFilter({ key: 'LIST_READ_POST', filter }));
  await store.dispatch(postAction.listReadPost.asyncThunk(filter));
  store.dispatch(END);
});

export default HomePage;
