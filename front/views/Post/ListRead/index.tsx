import React, { useEffect, useState } from 'react';

import { Empty, Space, Spin } from 'antd';

import PostCard from '@components/PostCard';
import { useAppDispatch, useAppSelector } from '@hooks/useAppRedux';
import useInfinitePost from '@modules/post/hooks/useInfinitePost';
import { userSelector } from '@modules/user';

import { DEAFULT_PAGE_SIZE } from './config/constants';
import PostForm from './organism/PostForm';
import { StyledBlock, StyledCenter } from './styles';

interface IProps {
  isSSR: boolean;
}

const Home = ({ isSSR }: IProps) => {
  const dispatch = useAppDispatch();
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
    <Space direction="vertical" size={0} split={<StyledBlock />}>
      {myData && <PostForm />}
      <div>
        {postListData.map((data) => (
          <PostCard collapse key={data.id} data={data} />
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
      </div>
    </Space>
  );
};

export default Home;
