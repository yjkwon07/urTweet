import { FC } from 'react';

import { Global } from '@emotion/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr';

import { useReadMyUser } from '@modules/user';
import { globalStyles } from 'public/styles';

import 'antd/dist/antd.css';

dayjs.locale('ko');
dayjs.extend(relativeTime);

const AuthCheck: FC = ({ children }) => {
  useReadMyUser();
  // 권한 검사는 여기서
  return <>{children}</>;
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <title>urTweet</title>
      </Head>
      <Global styles={globalStyles} />
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          shouldRetryOnError: false,
        }}
      >
        <AuthCheck>
          <Component {...pageProps} />
        </AuthCheck>
      </SWRConfig>
    </>
  );
};

export default App;
