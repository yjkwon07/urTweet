import React from 'react';

import Head from 'next/head';
import { END } from 'redux-saga';

import SEO from '@components/SEO';
import { postAction } from '@modules/post';
import { searchFilterAction } from '@modules/searchFilter';
import wrapper from '@modules/store/configStore';
import { HOME_URL } from '@utils/urls';
import ListReadView from '@views/Post/ListRead';

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
export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  store.dispatch(
    searchFilterAction.changeSearchFilter({
      key: 'LIST_READ_POST',
      filter: {
        page: 1,
        pageSize: 10,
      },
    }),
  );
  await store.dispatch(postAction.listReadPost.asyncThunk({ page: 1, pageSize: 10 }));
  store.dispatch(END);
});

export default HomePage;
