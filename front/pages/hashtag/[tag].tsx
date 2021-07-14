import React from 'react';

import Head from 'next/head';
import { END } from 'redux-saga';

import SEO, { IProps as ISEOProps } from '@components/SEO';
import BaseLayout from '@layouts/BaseLayout';
import { listReadHashTagPost } from '@modules/post';
import wrapper from '@modules/store/configStore';
import { GET_HASHTAG_URL } from '@utils/urls';
import HashtagListRead from '@views/Hashtag/List';

const DEAFULT_PAGE_SIZE = 3;

export interface IProps {
  title: string;
  seo: ISEOProps;
}

const HashtagListReadPage = ({ title, seo }: IProps) => {
  return (
    <BaseLayout>
      <Head>
        <title>{title}</title>
        <SEO title={seo.title} url={seo.url} description={seo.description} name={seo.name} keywords={seo.keywords} />
      </Head>
      <HashtagListRead isSSR />
    </BaseLayout>
  );
};

// SSR
export const getServerSideProps = wrapper.getServerSideProps(async ({ params, store }) => {
  const hashtag = params?.tag as string;
  if (hashtag) {
    await store.dispatch(listReadHashTagPost.asyncThunk({ hashtag, pageSize: DEAFULT_PAGE_SIZE }));
    store.dispatch(END);
    return {
      props: {
        title: `${hashtag} 글 | urTweet`,
        seo: {
          title: `${hashtag} 게시글`,
          url: GET_HASHTAG_URL(hashtag),
          description: `${hashtag} 게시글`,
          name: `${hashtag}`,
          keywords: `${hashtag}`,
        },
      },
    };
  }
  return {};
});

export default HashtagListReadPage;
