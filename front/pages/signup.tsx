import Head from 'next/head';

import SEO from '@components/SEO';
import Signup from '@views/Signup';
import { SignupPageFilter } from '@views/Signup/utils';

const SignupPage = () => {
  return (
    <>
      <Head>
        <title>회원가입 | urTweet</title>
        <SEO
          title="회원가입"
          url={new SignupPageFilter().url()}
          description="urTweet 회원가입"
          name="urTweet 회원가입"
          keywords="회원가입"
        />
      </Head>
      <Signup />
    </>
  );
};

export default SignupPage;
