import Head from 'next/head';
import { END } from 'redux-saga';

import SEO, { IProps as ISEOProps } from '@components/SEO';
import { postAction } from '@modules/post';
import wrapper from '@modules/store/configStore';
import ListReadView from '@views/Post/ListRead';
import { PostListReadPageFilter } from '@views/Post/ListRead/utils';

export interface IProps {
  title: string;
  seo: ISEOProps;
}

const HomePage = ({ title, seo }: IProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <SEO title={seo.title} url={seo.url} description={seo.description} name={seo.name} keywords={seo.keywords} />
      </Head>
      <ListReadView />
    </>
  );
};

// SSR
export const getServerSideProps = wrapper.getServerSideProps(async ({ store, query }) => {
  const { page, pageSize, hashtag } = PostListReadPageFilter.parseQuery(query);

  await store.dispatch(postAction.fetchListReadPost.asyncThunk({ page, pageSize, hashtag }));
  store.dispatch(END);

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
    },
  };
});

export default HomePage;
