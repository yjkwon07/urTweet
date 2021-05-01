import React from 'react';

import moment from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { wrapper } from '@modules/store/configStore';
import 'antd/dist/antd.css';

moment.locale('ko');
moment.extend(relativeTime);

const App = ({ Component }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>urTweet</title>
      </Head>
      <Component />
    </>
  );
};

export default wrapper.withRedux(App);
