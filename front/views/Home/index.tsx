import React, { useEffect, useMemo, useState } from 'react';

import { Spin } from 'antd';
import { useDispatch } from 'react-redux';

import PostCard from '@components/PostCard';
import AppLayout from '@layouts/App';
import { infinteListReadPost, postSelector } from '@modules/post';
import { DEAFULT_PAGE_SIZE } from '@modules/post/utils/constants';
import { useAppSelector } from '@modules/store/slices';
import { userSelector } from '@modules/user';

import PostForm from './PostForm';
import { StyledCenter } from './styles';

const Home = () => {
  const dispatch = useDispatch();
  const myData = useAppSelector(userSelector.myData);
  const { data: postListData, status, fetchData } = useAppSelector(postSelector.infiniteList);
  const [pageSize] = useState(DEAFULT_PAGE_SIZE);

  const hasMoreRead = useMemo(() => status === 'SUCCESS' && fetchData?.length === pageSize, [
    fetchData?.length,
    pageSize,
    status,
  ]);

  useEffect(() => {
    function onScroll() {
      if (postListData && hasMoreRead && status !== 'LOADING') {
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
          if (hasMoreRead) {
            const lastId = postListData[postListData.length - 1].id || 0;
            dispatch(infinteListReadPost.requset({ lastId, pageSize }));
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [status, postListData, hasMoreRead, dispatch, pageSize]);

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
