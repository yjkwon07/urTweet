import Head from 'next/head';

import SEO from '@components/SEO';
import BaseLayout from '@layouts/BaseLayout';
import { SIGNUP_URL } from '@utils/urls';
import Signup from '@views/Signup';

const SignupPage = () => {
  return (
    <BaseLayout>
      <Head>
        <title>회원가입 | urTweet</title>
        <SEO
          title="회원가입"
          url={SIGNUP_URL}
          description="urTweet 회원가입"
          name="urTweet 회원가입"
          keywords="회원가입"
        />
      </Head>
      <Signup />
    </BaseLayout>
  );
};

export default SignupPage;
