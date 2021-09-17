import { useCallback, useEffect } from 'react';

import { RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Empty, Input, Select, Space, Spin, Tooltip } from 'antd';
import throttle from 'lodash/throttle';

import PostCard from '@components/PostCard';
import BaseLayout from '@layouts/BaseLayout';
import { ListReadPostUrlQuery, useListReadPost } from '@modules/post';
import { useSearchFilter } from '@modules/searchFilter';

import PostForm from './PostForm';
import { StyledBlock, StyledCenter } from './styles';

const { Option } = Select;

const DEFAULT_CUR_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

const PostListReadView = () => {
  const { filter, changeFilter } = useSearchFilter<ListReadPostUrlQuery>('LIST_READ_POST', {
    page: DEFAULT_CUR_PAGE,
    pageSize: DEFAULT_PER_PAGE,
  });
  const { status, data: postListData, isMoreRead } = useListReadPost({ filter, mode: 'infinite' });

  const handleRefreshPostListData = useCallback(() => {
    changeFilter({ page: DEFAULT_CUR_PAGE, pageSize: DEFAULT_PER_PAGE });
  }, [changeFilter]);

  const handleNextPage = useCallback(() => {
    if (filter?.page && isMoreRead) {
      changeFilter({
        page: filter.page + 1,
      });
    }
  }, [changeFilter, filter?.page, isMoreRead]);

  const handleChangePageSize = useCallback(
    (value) => {
      changeFilter({
        page: 1,
        pageSize: value,
      });
    },
    [changeFilter],
  );

  useEffect(() => {
    const onScroll = throttle(function () {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        handleNextPage();
      }
    }, 300);

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [handleNextPage]);

  return (
    <BaseLayout
      filterGroup={
        <>
          <Space size={5}>
            <Tooltip title="새로고침">
              <Button shape="circle" icon={<RedoOutlined />} onClick={handleRefreshPostListData} />
            </Tooltip>
            <Select value={filter?.pageSize} style={{ width: 120 }} onChange={handleChangePageSize}>
              <Option value={10}>10개씩 보기</Option>
              <Option value={20}>20개씩 보기</Option>
              <Option value={30}>30개씩 보기</Option>
            </Select>
          </Space>
          <div style={{ marginTop: 10 }}>
            <Input size="large" prefix={<SearchOutlined />} style={{ borderRadius: 17 }} />
          </div>
        </>
      }
    >
      <Space direction="vertical" size={10} style={{ width: '100%' }}>
        <PostForm />
        <StyledBlock />
        {postListData && postListData.map((data) => <PostCard key={data.id} data={data} />)}
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
    </BaseLayout>
  );
};

export default PostListReadView;
