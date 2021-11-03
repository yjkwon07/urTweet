import React from 'react';

import Head from 'next/head';
import { END } from 'redux-saga';

import SEO, { IProps as ISEOProps } from '@components/SEO';
import { postAction } from '@modules/post';
import wrapper from '@modules/store/configStore';
import PostReadView from '@views/Post/Read';
import { PostReadPageFilter } from '@views/Post/Read/utils';

export interface IProps {
  title: string;
  seo: ISEOProps;
}

const PostReadPage = ({ title, seo }: IProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <SEO title={seo.title} url={seo.url} description={seo.description} name={seo.name} keywords={seo.keywords} />
      </Head>
      <PostReadView />
    </>
  );
};

// SSR
export const getServerSideProps = wrapper.getServerSideProps(async ({ store, params }) => {
  const postId = new PostReadPageFilter(params).param.id;

  if (postId) {
    store.dispatch(postAction.changeSelectId(postId));
    const {
      resData: { item: postData },
    } = await store.dispatch(postAction.fetchReadPost.asyncThunk({ postId }));
    store.dispatch(END);

    return {
      props: {
        title: `${postData.User.nickname}님의 글 | urTweet`,
        seo: {
          title: `${postData.User.nickname}님의 게시글`,
          url: new PostReadPageFilter({ id: postId }).url(),
          description: `${postData.content}님의 게시글`,
          name: `${postData.User.nickname}님의 게시글`,
          keywords: `${postData.User.nickname}`,
        },
      },
    };
  }
  return {};
});

export default PostReadPage;
