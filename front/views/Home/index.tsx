import React, { useEffect, useState } from 'react';

import { Empty, Space, Spin } from 'antd';
import { useDispatch } from 'react-redux';

import PostCard from '@components/PostCard';
import useInfinitePost from '@modules/post/hooks/useInfinitePost';
import { useAppSelector } from '@modules/store/slices';
import { userSelector } from '@modules/user';

import { DEAFULT_PAGE_SIZE } from './config/constants';
import PostForm from './Organism/PostForm';
import { StyledCenter } from './styles';

interface IProps {
  isSSR: boolean;
}

const Home = ({ isSSR }: IProps) => {
  const dispatch = useDispatch();
  const myData = useAppSelector(userSelector.myData);

  const [lastId, setLastId] = useState(0);
  const [pageSize] = useState(DEAFULT_PAGE_SIZE);
  const { status, data: postListData, hasMoreRead } = useInfinitePost({
    query: { lastId, pageSize },
    isInitFetch: isSSR,
  });

  useEffect(() => {
    function onScroll() {
      if (postListData && hasMoreRead && status !== 'LOADING') {
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
          if (hasMoreRead) {
            setLastId(postListData[postListData.length - 1].id);
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [status, postListData, hasMoreRead, dispatch, pageSize, lastId]);

  return (
    <Space size={6} direction="vertical" style={{ width: '100%' }}>
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
          <Empty description="정보를 불러오지 못했습니다." />
        </StyledCenter>
      )}
    </Space>
  );
};

export default Home;
