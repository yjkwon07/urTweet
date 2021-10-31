import { useCallback, useEffect } from 'react';

import { InsertRowBelowOutlined, InsertRowRightOutlined, RedoOutlined } from '@ant-design/icons';
import { Button, Select, Space, Tooltip, Typography } from 'antd';
import { useRouter } from 'next/router';

import BaseLayout from '@layouts/BaseLayout';
import { useListReadPost } from '@modules/post';

import AutoCompleteHashTag from './AutoCompleteHashTag';
import { pageFilter } from './config';
import InfiniteMode from './InfiniteListRead';
import PaginationMode from './PaginationRead';
import { StyledFilter } from './styles';

const { Title } = Typography;
const { Option } = Select;

const PostListReadView = () => {
  const router = useRouter();

  const {
    status,
    data: postListData,
    error: PostListError,
    isMoreRead,
    totalCount,
    filter: listReadPostFilter,
    fetch: fetchListReadPost,
  } = useListReadPost();

  const handleRefreshPostListData = useCallback(() => {
    pageFilter.filterSearch(router.pathname, router.query, {
      page: pageFilter.defaultOption.DEFAULT_CUR_PAGE,
      pageSize: pageFilter.defaultOption.DEFAULT_PER_PAGE,
      hashtag: '',
    });
  }, [router]);

  const handleChangePageSize = useCallback(
    (pageSize: number) => {
      pageFilter.filterSearch(router.pathname, router.query, {
        page: pageFilter.defaultOption.DEFAULT_CUR_PAGE,
        pageSize,
      });
    },
    [router],
  );

  const handleChangeMode = useCallback(
    (mode: ViewMode) => () => {
      if (mode === 'infinite') {
        pageFilter.filterSearch(router.pathname, router.query, {
          page: pageFilter.defaultOption.DEFAULT_CUR_PAGE,
          mode,
        });
      } else {
        pageFilter.filterSearch(router.pathname, router.query, { page: listReadPostFilter.page, mode });
      }
    },
    [listReadPostFilter.page, router],
  );

  useEffect(() => {
    fetchListReadPost();
  }, [fetchListReadPost]);

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
