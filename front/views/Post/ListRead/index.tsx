import { useCallback, useMemo } from 'react';

import { InsertRowBelowOutlined, InsertRowRightOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space, Tooltip } from 'antd';
import { useRouter } from 'next/router';

import BaseLayout from '@layouts/BaseLayout';
import { ListReadPostUrlQuery, useListReadPost } from '@modules/post';
import { useSearchFilter } from '@modules/searchFilter';

import filterSearch, { ViewMode } from './filterSearch';
import InfiniteMode from './InfiniteListRead';
import PaginationMode from './PaginationRead';
import { StyledFilter } from './styles';

const { Option } = Select;

const DEFAULT_CUR_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

const PostListReadView = () => {
  const router = useRouter();

  const { filter } = useSearchFilter<ListReadPostUrlQuery>('LIST_READ_POST');
  const mode = useMemo<ViewMode>(() => (router.query.mode as ViewMode) || 'infinite', [router.query.mode]);
  const {
    status,
    data: postListData,
    error: PostListError,
    isMoreRead,
    totalCount,
  } = useListReadPost({ filter, mode });

  const handleRefreshPostListData = useCallback(() => {
    filterSearch(router, {
      page: DEFAULT_CUR_PAGE,
      pageSize: DEFAULT_PER_PAGE,
      hashtag: '',
    });
  }, [router]);

  const handleChangePageSize = useCallback(
    (pageSize: number) => {
      filterSearch(router, {
        page: DEFAULT_CUR_PAGE,
        pageSize,
      });
    },
    [router],
  );

  const handleChangeMode = useCallback(
    (mode: ViewMode) => () => {
      if (mode === 'infinite') {
        filterSearch(router, {
          page: DEFAULT_CUR_PAGE,
          mode,
        });
      } else {
        filterSearch(router, {
          page: filter?.page,
          mode,
        });
      }
    },
    [filter?.page, router],
  );

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
                <Select className="select" value={filter?.pageSize} onChange={handleChangePageSize}>
                  <Option value={10}>10개씩 보기</Option>
                  <Option value={20}>20개씩 보기</Option>
                  <Option value={30}>30개씩 보기</Option>
                </Select>
              </Space>
            </div>
            <div>
              <Input className="search" size="large" prefix={<SearchOutlined />} />
            </div>
          </Space>
        </StyledFilter>
      }
    >
      {mode === 'infinite' && (
        <InfiniteMode
          status={status}
          postList={postListData}
          isMoreRead={isMoreRead}
          errorMsg={status === 'FAIL' && PostListError.resMsg}
        />
      )}
      {mode === 'page' && (
        <PaginationMode
          status={status}
          postList={postListData}
          totalCount={totalCount}
          errorMsg={status === 'FAIL' && PostListError.resMsg}
        />
      )}
    </BaseLayout>
  );
};

export default PostListReadView;
