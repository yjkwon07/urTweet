import { useCallback } from 'react';

import { Empty, Pagination, Space, Spin } from 'antd';

import PostCard from '@components/PostCard';
import { FetchStatus } from '@modules/fetchStatus';
import { ListReadPostUrlQuery } from '@modules/post';
import { Post } from '@modules/post/@types';
import { useSearchFilter } from '@modules/searchFilter';

import { StyledCenter, StyledViewWrapper } from './styles';

export interface IProps {
  status: FetchStatus;
  postList: Post[];
  totalCount: number;
  errorMsg?: string;
}

const PaginationMode = ({ status, postList, totalCount, errorMsg }: IProps) => {
  const { filter, changeFilter } = useSearchFilter<ListReadPostUrlQuery>('LIST_READ_POST');

  const handleChangePage = useCallback(
    (page: number) => {
      changeFilter({ page });
    },
    [changeFilter],
  );

  return (
    <StyledViewWrapper>
      <Space className="wrapper" direction="vertical" size={10}>
        {status === 'SUCCESS' && postList?.map((data) => <PostCard key={data.id} data={data} />)}
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
          current={filter?.page}
          total={totalCount}
          onChange={handleChangePage}
          pageSize={filter?.pageSize}
          showSizeChanger={false}
        />
      </StyledCenter>
    </StyledViewWrapper>
  );
};

export default PaginationMode;
