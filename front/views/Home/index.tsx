import React, { useEffect } from 'react';

import { Spin } from 'antd';

import AppLayout from '@layouts/App';
import useInfiniteListPost from '@modules/post/hooks/useInfiniteListPost';
import { useMyUser } from '@modules/user';

import PostCard from './PostCard';
import PostForm from './PostForm';
import { StyledCenter } from './styles';

const Home = () => {
  const { data: myData } = useMyUser();
  const { data: postListData, status, hasMoreRead, setLastId } = useInfiniteListPost();

  useEffect(() => {
    function onScroll() {
      if (postListData && hasMoreRead && status !== 'LOADING') {
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
          window.scrollTo({ top: window.scrollY - 300 });
          setLastId(postListData[postListData.length - 1].id);
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [status, postListData, hasMoreRead, setLastId]);

  return (
    <AppLayout>
      {myData && <PostForm />}
      {postListData.map((data) => (
        <PostCard key={data.id} data={data} />
      ))}
      {status === 'LOADING' && (
        <StyledCenter>
          <Spin />
        </StyledCenter>
      )}
      {status === 'FAIL' && (
        <StyledCenter>
          <p>정보를 불러오지 못했습니다.</p>
        </StyledCenter>
      )}
    </AppLayout>
  );
};

export default Home;
