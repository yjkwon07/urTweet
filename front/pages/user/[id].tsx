import React from 'react';

import Head from 'next/head';
import { END } from 'redux-saga';

import SEO, { IProps as ISEOProps } from '@components/SEO';
import { postAction } from '@modules/post';
import wrapper from '@modules/store/configStore';
import { userAction } from '@modules/user';
import UserRead from '@views/User/Read';
import { UserReadPageFilter } from '@views/User/Read/utils';

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
  const userId = UserReadPageFilter.parseParam(params).id;
  const filter = UserReadPageFilter.parseQuery(query);

  if (userId) {
    store.dispatch(userAction.changeSelectId(userId));
    store.dispatch(postAction.changeFilter({ filter }));
    const {
      resData: { item: userData },
    } = await store.dispatch(userAction.fetchReadUser.asyncThunk({ userId }));
    await store.dispatch(postAction.fetchListReadPost.asyncThunk(filter));
    store.dispatch(END);

    return {
      props: {
        title: `${userData?.nickname} | urTweet`,
        seo: {
          title: `${userData?.nickname}님의 게시글`,
          url: new UserReadPageFilter(params, query).url(),
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
