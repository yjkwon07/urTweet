import React from 'react';

import Head from 'next/head';
import { END } from 'redux-saga';

import SEO, { IProps as ISEOProps } from '@components/SEO';
import AppLayout from '@layouts/App';
import { readPost } from '@modules/post';
import wrapper from '@modules/store/configStore';
import { GET_POST_URL } from '@utils/urls';
import PostRead from '@views/Post/Read';

export interface IProps {
  title: string;
  seo: ISEOProps;
}
const PostPage = ({ title, seo }: IProps) => {
  return (
    <AppLayout>
      <Head>
        <title>{title}</title>
        <SEO title={seo.title} url={seo.url} description={seo.description} name={seo.name} keywords={seo.keywords} />
      </Head>
      <PostRead isSSR />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const postId = context.params?.id as string;
  if (postId) {
    const postData = await context.store.dispatch(readPost.asyncTunk({ postId: Number(postId) }));
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
    return {
      props: {
        title: `${postData.User.nickname}님의 글 | urTweet`,
        seo: {
          title: `${postData.User.nickname}님의 게시글`,
          url: GET_POST_URL(postId),
          description: `${postData.content}님의 게시글`,
          name: `${postData.User.nickname}님의 게시글`,
          keywords: `${postData.User.nickname}`,
        },
      },
    };
  }
  return {};
});

export default PostPage;
