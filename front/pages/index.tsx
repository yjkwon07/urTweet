import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { SWRConfig } from 'swr';

import SEO, { IProps as ISEOProps } from '@components/SEO';
import { GET_LIST_READ_POST_API, ListReadPostResData, requestListReadPost } from '@modules/post';
import ListReadView from '@views/Post/ListRead';
import { PostListReadPageFilter } from '@views/Post/ListRead/utils';

export interface IProps {
  title: string;
  seo: ISEOProps;
  fallback: { string: ListReadPostResData };
}

const HomePage = ({ title, seo, fallback }: IProps) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Head>
        <title>{title}</title>
        <SEO title={seo.title} url={seo.url} description={seo.description} name={seo.name} keywords={seo.keywords} />
      </Head>
      <ListReadView />
    </SWRConfig>
  );
};

// SSR
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { page, pageSize, hashtag } = PostListReadPageFilter.parseQuery(query);

  const {
    data: { resData },
  } = await requestListReadPost({ page, pageSize, hashtag });

  return {
    props: {
      title: `HOME | urTweet`,
      seo: {
        title: `urTweet Home`,
        url: new PostListReadPageFilter(query).url,
        description: `urTweet Home page`,
        name: `urTweet Home`,
        keywords: `Home`,
      },
      fallback: {
        [GET_LIST_READ_POST_API({ page, pageSize, hashtag })]: resData,
      },
    },
  };
};

export default HomePage;
