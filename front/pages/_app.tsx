import React from 'react';

import { Global } from '@emotion/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AppProps } from 'next/app';
import Head from 'next/head';

import wrapper from '@modules/store/configStore';
import { globalStyles } from 'public/styles';

import 'antd/dist/antd.css';

dayjs.locale('ko');
dayjs.extend(relativeTime);

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <Global styles={globalStyles} />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>urTweet</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(App);
