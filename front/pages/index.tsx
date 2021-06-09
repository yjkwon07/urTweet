import React from 'react';

import Head from 'next/head';
import { END } from 'redux-saga';

import SEO, { IProps as ISEOProps } from '@components/SEO';
import BaseLayout from '@layouts/BaseLayout';
import { infinteListReadPost } from '@modules/post';
import { DEAFULT_PAGE_SIZE } from '@modules/post/utils/constants';
import wrapper from '@modules/store/configStore';
import { HOME_URL } from '@utils/urls';
import Home from '@views/Home';

export interface IProps {
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
      <Home isSSR />
    </BaseLayout>
  );
};

// SSR
// https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  await store.dispatch(infinteListReadPost.asyncTunk({ pageSize: DEAFULT_PAGE_SIZE }));
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
