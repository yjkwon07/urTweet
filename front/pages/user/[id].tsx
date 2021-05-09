import React from 'react';

import { END } from 'redux-saga';

import { listReadUserPost } from '@modules/post';
import { DEAFULT_PAGE_SIZE } from '@modules/post/utils/constants';
import { wrapper } from '@modules/store/configStore';
import UserRead from '@views/User/Read';

const UserReadPages = () => {
  return <UserRead />;
};

// SSR
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  if (context.params?.id) {
    context.store.dispatch(
      listReadUserPost.requset({ userId: Number(context.params.id), pageSize: DEAFULT_PAGE_SIZE }),
    );
  }
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default UserReadPages;
