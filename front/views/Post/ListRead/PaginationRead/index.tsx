import { useCallback } from 'react';

import { Empty, Pagination, Space, Spin } from 'antd';
import { useRouter } from 'next/router';

import PostCard from '@components/PostCard';
import { FetchStatus } from '@modules/fetchStatus';
import { useListReadPost } from '@modules/post';
import { Post } from '@modules/post/@types';

import { pageFilter } from '../config';
import { StyledCenter, StyledViewWrapper } from './styles';

export interface IProps {
  status: FetchStatus;
  postList: Post[];
  totalCount: number;
  errorMsg?: string;
}

const PaginationRead = ({ status, postList, totalCount, errorMsg }: IProps) => {
  const router = useRouter();

  const { filter } = useListReadPost();

  const handleChangePage = useCallback(
    (page: number) => {
      pageFilter.filterSearch(router.pathname, router.query, { page });
    },
    [router],
  );

  return (
    <StyledViewWrapper>
      <Space className="wrapper" direction="vertical" size={10}>
        {status === 'SUCCESS' && postList.map((data) => <PostCard key={data.id} data={data} />)}
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
      <StyledCenter>
        <Pagination
          showSizeChanger={false}
          current={filter.page}
          total={totalCount}
          onChange={handleChangePage}
          pageSize={filter?.pageSize}
        />
      </StyledCenter>
    </StyledViewWrapper>
  );
};

export default PaginationRead;
