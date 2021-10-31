import { useCallback, useEffect } from 'react';

import { InsertRowBelowOutlined, InsertRowRightOutlined, RedoOutlined } from '@ant-design/icons';
import { Button, Select, Space, Tooltip, Typography } from 'antd';
import { useRouter } from 'next/router';

import BaseLayout from '@layouts/BaseLayout';
import { useListReadPost, useListReadPostFilter } from '@modules/post';

import AutoCompleteHashTag from './AutoCompleteHashTag';
import filterSearch, { DEFAULT_CUR_PAGE, DEFAULT_PER_PAGE } from './filterSearch';
import InfiniteMode from './InfiniteListRead';
import PaginationMode from './PaginationRead';
import { StyledFilter } from './styles';

const { Title } = Typography;
const { Option } = Select;

const PostListReadView = () => {
  const router = useRouter();

  const { filter: listReadPostFilter } = useListReadPostFilter();

  const {
    status,
    data: postListData,
    error: PostListError,
    isMoreRead,
    totalCount,
    fetch: fetchListReadPost,
  } = useListReadPost();

  const handleRefreshPostListData = useCallback(() => {
    filterSearch(router.pathname, router.query, { page: DEFAULT_CUR_PAGE, pageSize: DEFAULT_PER_PAGE, hashtag: '' });
  }, [router]);

  const handleChangePageSize = useCallback(
    (pageSize: number) => {
      filterSearch(router.pathname, router.query, { page: DEFAULT_CUR_PAGE, pageSize });
    },
    [router],
  );

  const handleChangeMode = useCallback(
    (mode: ViewMode) => () => {
      if (mode === 'infinite') {
        filterSearch(router.pathname, router.query, { page: DEFAULT_CUR_PAGE, mode });
      } else {
        filterSearch(router.pathname, router.query, { page: listReadPostFilter.page, mode });
      }
    },
    [listReadPostFilter.page, router],
  );

  useEffect(() => {
    const { mode, page, pageSize, hashtag, userId } = listReadPostFilter;
    const query = { page, pageSize, hashtag, userId };
    fetchListReadPost({ mode, query });
  }, [fetchListReadPost, listReadPostFilter]);

  return (
    <BaseLayout
      filterGroup={
        <StyledFilter>
          <Space className="wrapper" size={10} direction="vertical">
            <div>
              <Space size={5}>
                <Tooltip title="스크롤">
                  <Button shape="circle" icon={<InsertRowRightOutlined />} onClick={handleChangeMode('infinite')} />
                </Tooltip>
                <Tooltip title="페이지네이션">
                  <Button shape="circle" icon={<InsertRowBelowOutlined />} onClick={handleChangeMode('page')} />
                </Tooltip>
              </Space>
            </div>
            <div>
              <Space size={5}>
                <Tooltip title="새로고침">
                  <Button shape="circle" icon={<RedoOutlined />} onClick={handleRefreshPostListData} />
                </Tooltip>
                <Select className="select" value={listReadPostFilter.pageSize} onChange={handleChangePageSize}>
                  <Option value={10}>10개씩 보기</Option>
                  <Option value={20}>20개씩 보기</Option>
                  <Option value={30}>30개씩 보기</Option>
                </Select>
                <span className="search-result">총 {totalCount}건 검색</span>
              </Space>
            </div>
            <div>
              <AutoCompleteHashTag />
            </div>
          </Space>
        </StyledFilter>
      }
    >
      {listReadPostFilter.hashtag && <Title>#{listReadPostFilter.hashtag}</Title>}
      {listReadPostFilter.mode === 'infinite' && (
        <InfiniteMode
          status={status}
          postList={postListData}
          isMoreRead={isMoreRead}
          errorMsg={PostListError?.resMsg}
        />
      )}
      {listReadPostFilter.mode === 'page' && (
        <PaginationMode
          status={status}
          postList={postListData}
          totalCount={totalCount}
          errorMsg={PostListError?.resMsg}
        />
      )}
    </BaseLayout>
  );
};

export default PostListReadView;
