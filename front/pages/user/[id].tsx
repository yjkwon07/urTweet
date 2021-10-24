import React from 'react';

import Head from 'next/head';
import { END } from 'redux-saga';

import SEO, { IProps as ISEOProps } from '@components/SEO';
import { postAction } from '@modules/post';
import { searchFilterAction } from '@modules/searchFilter';
import wrapper from '@modules/store/configStore';
import { userAction } from '@modules/user';
import { GET_USER_URL } from '@utils/urls';
import UserRead from '@views/User/Read';

export interface IProps {
  title: string;
  seo: ISEOProps;
}

const UserReadPages = ({ title, seo }: IProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <SEO title={seo.title} url={seo.url} description={seo.description} name={seo.name} keywords={seo.keywords} />
      </Head>
      <UserRead />
    </>
  );
};

// SSR
export const getServerSideProps = wrapper.getServerSideProps(async ({ store, params, query }) => {
  const page = Number(query.page) ? Number(query.page) : 1;
  const pageSize = Number(query.pageSize) || 10;
  const userId = Number(params?.id);
  const filter = {
    page,
    pageSize,
    userId,
  };

  if (userId) {
    store.dispatch(searchFilterAction.changeSearchFilter({ key: 'LIST_READ_POST', filter }));
    store.dispatch(searchFilterAction.changeSearchFilter({ key: 'READ_USER', filter: { userId } }));
    const {
      resData: { item: userData },
    } = await store.dispatch(userAction.fetchReadUser.asyncThunk({ userId: Number(userId) }));
    await store.dispatch(postAction.fetchListReadPost.asyncThunk(filter));
    store.dispatch(END);

    return {
      props: {
        title: `${userData?.nickname} | urTweet`,
        seo: {
          title: `${userData?.nickname}님의 게시글`,
          url: GET_USER_URL(userId.toString()),
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
