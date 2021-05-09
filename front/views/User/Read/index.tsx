import React, { useEffect, useState } from 'react';

import { Card } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import PostCard from '@components/PostCard';
import AppLayout from '@layouts/App';
import { listReadUserPost } from '@modules/post';
import useInfiniteListUserPost from '@modules/post/hooks/useInfiniteListUserPost';
import { DEAFULT_PAGE_SIZE } from '@modules/post/utils/constants';
import useUser from '@modules/user/hooks/useUser';
import { GET_USER_URL } from '@utils/urls';

const Read = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { data: userData } = useUser({ userId: Number(id) });
  const [pageSize] = useState(DEAFULT_PAGE_SIZE);
  const { data: postListData, status, hasMoreRead } = useInfiniteListUserPost({ userId: Number(id), pageSize });

  useEffect(() => {
    function onScroll() {
      if (postListData && hasMoreRead && status !== 'LOADING') {
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
          if (hasMoreRead) {
            const lastId = postListData[postListData.length - 1].id || 0;
            dispatch(listReadUserPost.requset({ userId: Number(id), lastId, pageSize }));
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [status, postListData, hasMoreRead, dispatch, pageSize, id]);

  if (!userData) return null;
  return (
    <AppLayout>
      <Head>
        <title>{userData.nickname}님의 글 | urTweet</title>
        <meta name="description" content={`${userData.nickname}님의 게시글`} />
        <meta property="og:title" content={`${userData.nickname}님의 게시글`} />
        <meta property="og:description" content={`${userData.nickname}님의 게시글`} />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content={GET_USER_URL(id as string)} />
      </Head>
      {userData && (
        <div style={{ padding: 5, background: '#ececec', marginBottom: 20 }}>
          <Card
            actions={[
              <div key="twit">
                게시글
                <br />
                {userData.Posts}
              </div>,
              <div key="following">
                팔로잉
                <br />
                {userData.Followings}
              </div>,
              <div key="follower">
                팔로워
                <br />
                {userData.Followers}
              </div>,
            ]}
          >
            <Card.Meta avatar={<Avatar>{userData.nickname[0]}</Avatar>} title={userData.nickname} />
          </Card>
        </div>
      )}
      {postListData.map((post) => (
        <PostCard key={post.id} data={post} />
      ))}
    </AppLayout>
  );
};

export default Read;
