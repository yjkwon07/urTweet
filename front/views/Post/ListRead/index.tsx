import { useCallback, useMemo } from 'react';

import { InsertRowBelowOutlined, InsertRowRightOutlined, RedoOutlined } from '@ant-design/icons';
import { Button, Select, Space, Tooltip, Typography } from 'antd';
import { useRouter } from 'next/router';

import BaseLayout from '@layouts/BaseLayout';
import { useInfiniteListReadPost } from '@modules/post';

import AutoCompleteHashTag from './AutoCompleteHashTag';
import InfiniteMode from './InfiniteListRead';
import PaginationMode from './PaginationRead';
import { StyledFilter } from './styles';
import { PostListReadPageFilter } from './utils';

const { Title } = Typography;
const { Option } = Select;

const PostListReadView = () => {
  const router = useRouter();
  const postListReadPageFilter = useMemo(() => new PostListReadPageFilter(router.query), [router.query]);
  const { query } = postListReadPageFilter;

  const { curPage, totalCount } = useInfiniteListReadPost({
    page: query.page,
    pageSize: query.pageSize,
    hashtag: query.hashtag,
  });

  const handleRefreshPostListData = useCallback(() => {
    postListReadPageFilter.search({
      page: PostListReadPageFilter.defaultOption.DEFAULT_CUR_PAGE,
      pageSize: PostListReadPageFilter.defaultOption.DEFAULT_PER_PAGE,
      hashtag: '',
    });
  }, [postListReadPageFilter]);

  const handleChangePageSize = useCallback(
    (pageSize: number) => {
      postListReadPageFilter.search({
        page: PostListReadPageFilter.defaultOption.DEFAULT_CUR_PAGE,
        pageSize,
      });
    },
    [postListReadPageFilter],
  );

  const handleChangeMode = useCallback(
    (mode: ViewMode) => () => {
      if (mode === 'infinite') {
        postListReadPageFilter.search({
          page: PostListReadPageFilter.defaultOption.DEFAULT_CUR_PAGE,
          mode,
        });
      } else {
        postListReadPageFilter.search({ page: curPage, mode });
      }
    },
    [postListReadPageFilter, curPage],
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
                <Select className="select" value={query.pageSize} onChange={handleChangePageSize}>
                  <Option value={10}>10개씩 보기</Option>
                  <Option value={20}>20개씩 보기</Option>
                  <Option value={30}>30개씩 보기</Option>
                </Select>
                <span className="search-result">총 {totalCount}건 검색</span>
              </Space>
            </div>
            <div>
              <AutoCompleteHashTag hashtag={query.hashtag} />
            </div>
          </Space>
        </StyledFilter>
      }
    >
      {query.hashtag && <Title>#{query.hashtag}</Title>}
      {query.mode === 'infinite' && <InfiniteMode />}
      {query.mode === 'page' && <PaginationMode />}
    </BaseLayout>
  );
};

export default PostListReadView;
