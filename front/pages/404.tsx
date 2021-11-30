import Head from 'next/head';

import Custom404View from '@views/404';

const Custom404Page = () => {
  return (
    <>
      <Head>
        <title>Page Not Found | urTweet</title>
      </Head>
      <Custom404View />
    </>
  );
};

export default Custom404Page;
