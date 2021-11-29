import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { SWRConfig } from 'swr';

import SEO, { IProps as ISEOProps } from '@components/SEO';
import { GET_READ_POST_API, requestReadPost } from '@modules/post';
import { Custom404PageFilter } from '@views/404/utils';
import PostReadView from '@views/Post/Read';
import { PostReadPageFilter } from '@views/Post/Read/utils';

export interface IProps {
  title: string;
  seo: ISEOProps;
  fallback: { [key: string]: any };
}

const PostReadPage = ({ title, seo, fallback }: IProps) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Head>
        <title>{title}</title>
        <SEO title={seo.title} url={seo.url} description={seo.description} name={seo.name} keywords={seo.keywords} />
      </Head>
      <PostReadView />
    </SWRConfig>
  );
};

// SSR
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const postId = PostReadPageFilter.parseParam(params).id;

    const {
      data: {
        resData: { item: postData },
      },
    } = await requestReadPost({ postId });

    return {
      props: {
        title: `${postData.User.nickname}님의 글 | urTweet`,
        seo: {
          title: `${postData.User.nickname}님의 게시글`,
          url: new PostReadPageFilter({ id: postId }).url,
          description: `${postData.content}님의 게시글`,
          name: `${postData.User.nickname}님의 게시글`,
          keywords: `${postData.User.nickname}`,
        },
        fallback: {
          [GET_READ_POST_API({ postId })]: postData,
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

export default PostReadPage;
