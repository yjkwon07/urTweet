import React, { useEffect } from 'react';

import { Spin } from 'antd';
import { useSelector } from 'react-redux';

import AppLayout from '@layouts/App';
import useInfiniteListPost from '@modules/post/hooks/useInfiniteListPost';
import { userSelector } from '@modules/user';

import PostCard from './PostCard';
import PostForm from './PostForm';
import { StyledCenter } from './styles';

const Home = () => {
  const myData = useSelector(userSelector.myData);
  const { data: postListData, status, hasMoreRead, setPage } = useInfiniteListPost();

  useEffect(() => {
    function onScroll() {
      if (postListData && hasMoreRead && status !== 'LOADING') {
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
          window.scrollTo({ top: window.scrollY - 300 });
          setPage((prevPage) => prevPage + 1);
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [status, postListData, hasMoreRead, setPage]);

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
