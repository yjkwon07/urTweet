import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { SWRConfig } from 'swr';

import SEO, { IProps as ISEOProps } from '@components/SEO';
import { GET_LIST_READ_POST_API, requestListReadPost } from '@modules/post';
import { GET_READ_USER_API, requestReadUser } from '@modules/user';
import { getInfiniteKey } from '@utils/swrHelper';
import { Custom404PageFilter } from '@views/404/utils';
import UserRead from '@views/User/Read';
import { UserReadPageFilter } from '@views/User/Read/utils';

export interface IProps {
  title: string;
  seo: ISEOProps;
  fallback: { [key: string]: any };
}

const UserReadPages = ({ title, seo, fallback }: IProps) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Head>
        <title>{title}</title>
        <SEO title={seo.title} url={seo.url} description={seo.description} name={seo.name} keywords={seo.keywords} />
      </Head>
      <UserRead />
    </SWRConfig>
  );
};

// SSR
export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  try {
    const userId = UserReadPageFilter.parseParam(params).id;
    const filter = UserReadPageFilter.parseQuery(query);

    const {
      data: {
        resData: { item: userData },
      },
    } = await requestReadUser({ userId });
    const {
      data: { resData },
    } = await requestListReadPost(filter);

    return {
      props: {
        title: `${userData?.nickname} | urTweet`,
        seo: {
          title: `${userData?.nickname}님의 게시글`,
          url: new UserReadPageFilter(params, query).url,
          description: `${userData?.nickname}님의 게시글`,
          name: `${userData?.nickname}님의 게시글`,
          keywords: `${userData?.nickname}`,
        },
        fallback: {
          [GET_READ_USER_API({ userId })]: userData,
          [`${getInfiniteKey()}${GET_LIST_READ_POST_API(filter)}`]: [resData],
        },
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: new Custom404PageFilter().pathname,
        permanent: false,
      },
    };
  }
};

export default UserReadPages;
