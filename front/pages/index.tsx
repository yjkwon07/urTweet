import React from 'react';

import Head from 'next/head';
import { END } from 'redux-saga';

import SEO, { IProps as ISEOProps } from '@components/SEO';
import BaseLayout from '@layouts/BaseLayout';
import { infiniteListReadPost } from '@modules/post';
import wrapper from '@modules/store/configStore';
import { HOME_URL } from '@utils/urls';
import PostListRead from '@views/Post/ListRead';
import { DEAFULT_PAGE_SIZE } from '@views/Post/ListRead/config/constants';

interface IProps {
  title: string;
  seo: ISEOProps;
}

const HomePage = ({ title, seo }: IProps) => {
  return (
    <BaseLayout>
      <Head>
        <title>{title}</title>
        <SEO title={seo.title} url={seo.url} description={seo.description} name={seo.name} keywords={seo.keywords} />
      </Head>
      <PostListRead isSSR />
    </BaseLayout>
  );
};

// SSR
export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  await store.dispatch(infiniteListReadPost.asyncThunk({ pageSize: DEAFULT_PAGE_SIZE }));
  store.dispatch(END);
  return {
    props: {
      title: `HOME | urTweet`,
      seo: {
        title: `urTweet Home`,
        url: HOME_URL,
        description: `urTweet Home page`,
        name: `urTweet Home`,
        keywords: `Home`,
      },
    },
  };
});

export default HomePage;
