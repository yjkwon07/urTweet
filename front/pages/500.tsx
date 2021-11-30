import Head from 'next/head';

import Custom500View from '@views/500';

const Custom500Page = () => {
  return (
    <>
      <Head>
        <title>Server error | urTweet</title>
      </Head>
      <Custom500View />
    </>
  );
};

export default Custom500Page;
