import React from 'react';

import { useSelector } from 'react-redux';

import AppLayout from '@layouts/App';
import useListPost from '@modules/post/hooks/useListPost';
import { userSelector } from '@modules/user';

import PostCard from './PostCard';
import PostForm from './PostForm';

const Home = () => {
  const myData = useSelector(userSelector.myData);
  const { data: postListData } = useListPost();

  return (
    <AppLayout>
      {myData && <PostForm />}
      {postListData.map((data) => (
        <PostCard key={data.id} data={data} />
      ))}
    </AppLayout>
  );
};

export default Home;
