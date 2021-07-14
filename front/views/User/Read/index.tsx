import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import PostCard from '@components/PostCard';
import { listReadUserPost } from '@modules/post';
import useInfiniteUserPost from '@modules/post/hooks/useInfiniteUserPost';
import { useMyUser } from '@modules/user';
import useUser from '@modules/user/hooks/useUser';

import UserInfo from './Organism/UserInfo';

const DEAFULT_PAGE_SIZE = 10;

export interface IProps {
  isSSR: boolean;
}

const Read = ({ isSSR }: IProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userId = Number(router.query.id as string);
  const { data: myData } = useMyUser({});
  const { data: userData } = useUser({ isInitFetch: !isSSR, userId });
  const [pageSize] = useState(DEAFULT_PAGE_SIZE);
  const { data: postListData, status, hasMoreRead } = useInfiniteUserPost({
    isInitFetch: !isSSR,
    userId,
    pageSize,
  });

  useEffect(() => {
    function onScroll() {
      if (postListData && hasMoreRead && status !== 'LOADING') {
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
          if (hasMoreRead) {
            const lastId = postListData[postListData.length - 1].id;
            dispatch(listReadUserPost.request({ userId, lastId, pageSize }));
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [status, postListData, hasMoreRead, dispatch, pageSize, userId]);

  return (
    <>
      {userData && (
        <>
          {myData?.id !== userId && <UserInfo data={userData} />}
          {postListData.map((post) => (
            <PostCard key={post.id} data={post} />
          ))}
        </>
      )}
    </>
  );
};

export default Read;
