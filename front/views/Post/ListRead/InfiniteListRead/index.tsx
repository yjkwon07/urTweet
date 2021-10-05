import { useCallback } from 'react';

import { Empty, Space, Spin } from 'antd';

import PostCard from '@components/PostCard';
import useEndReachScroll from '@hooks/useEndReachScroll';
import { FetchStatus } from '@modules/fetchStatus';
import { ListReadPostUrlQuery } from '@modules/post';
import { Post } from '@modules/post/@types';
import { useSearchFilter } from '@modules/searchFilter';
import { useReadMyUser } from '@modules/user';

import PostForm from '../PostForm';
import { StyledCenter, StyledFormBlock, StyledViewWrapper } from './styles';

export interface IProps {
  status: FetchStatus;
  postList: Post[];
  isMoreRead: boolean;
  errorMsg?: string;
}

const InfiniteListRead = ({ status, postList, isMoreRead, errorMsg }: IProps) => {
  const { filter, changeFilter } = useSearchFilter<ListReadPostUrlQuery>('LIST_READ_POST');
  const { data: myData } = useReadMyUser();

  const handleNextPage = useCallback(() => {
    if (filter?.page && isMoreRead) {
      changeFilter({
        page: filter.page + 1,
      });
    }
  }, [changeFilter, filter?.page, isMoreRead]);

  useEndReachScroll({ callback: handleNextPage });

  return (
    <StyledViewWrapper>
      <Space className="wrapper" direction="vertical" size={10}>
        {myData && (
          <>
            <PostForm />
            <StyledFormBlock />
          </>
        )}
        {status !== 'FAIL' && postList.map((data) => <PostCard key={data.id} data={data} />)}
        {status === 'LOADING' && (
          <StyledCenter>
            <Spin />
          </StyledCenter>
        )}
        {status === 'FAIL' && (
          <StyledCenter>
            <Empty description={errorMsg} />
          </StyledCenter>
        )}
      </Space>
    </StyledViewWrapper>
  );
};

export default InfiniteListRead;
