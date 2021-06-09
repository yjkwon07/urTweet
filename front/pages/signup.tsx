import React from 'react';

import Head from 'next/head';

import SEO, { IProps as ISEOProps } from '@components/SEO';
import BaseLayout from '@layouts/BaseLayout';
import { SIGNUP_URL } from '@utils/urls';
import Signup from '@views/Signup';

export interface IProps {
  title: string;
  seo: ISEOProps;
}

const SignupPage = ({ title, seo }: IProps) => {
  return (
    <BaseLayout>
      <Head>
        <title>{title}</title>
        <SEO title={seo.title} url={seo.url} description={seo.description} name={seo.name} keywords={seo.keywords} />
      </Head>
      <Signup />
    </BaseLayout>
  );
};

// Static Generation
export async function getStaticProps() {
  return {
    props: {
      title: `회원가입 | urTweet`,
      seo: {
        title: `회원가입`,
        url: SIGNUP_URL,
        description: `urTweet 회원가입`,
        name: `urTweet 회원가입`,
        keywords: `회원가입`,
      },
    },
  };
}

export default SignupPage;
