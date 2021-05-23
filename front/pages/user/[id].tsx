import React from 'react';

import Head from 'next/head';
import { END } from 'redux-saga';

import SEO, { IProps as ISEOProps } from '@components/SEO';
import AppLayout from '@layouts/App';
import { listReadUserPost } from '@modules/post';
import { DEAFULT_PAGE_SIZE } from '@modules/post/utils/constants';
import { wrapper } from '@modules/store/configStore';
import { readUser } from '@modules/user';
import { GET_USER_URL } from '@utils/urls';
import UserRead from '@views/User/Read';

export interface IProps {
  title: string;
  seo: ISEOProps;
}

const UserReadPages = ({ title, seo }: IProps) => {
  return (
    <AppLayout>
      <Head>
        <title>{title}</title>
        <SEO title={seo.title} url={seo.url} description={seo.description} name={seo.name} keywords={seo.keywords} />
      </Head>
      <UserRead isSSR />
    </AppLayout>
  );
};

// SSR
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const userId = context.params?.id as string;
  if (userId) {
    const userData = await context.store.dispatch(readUser.asyncTunk({ userId: Number(userId) }));
    context.store.dispatch(listReadUserPost.asyncTunk({ userId: Number(userId), pageSize: DEAFULT_PAGE_SIZE }));
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
    return {
      props: {
        title: `${userData?.nickname} | urTweet`,
        seo: {
          title: `${userData?.nickname}님의 게시글`,
          url: GET_USER_URL(userId),
          description: `${userData?.nickname}님의 게시글`,
          name: `${userData?.nickname}님의 게시글`,
          keywords: `${userData?.nickname}`,
        },
      },
    };
  }
  return {};
});

export default UserReadPages;
