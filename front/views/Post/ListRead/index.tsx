import { useCallback, useEffect, useMemo, useState } from 'react';

import { InsertRowBelowOutlined, InsertRowRightOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Input, Select, Space, Tooltip, Typography } from 'antd';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';

import BaseLayout from '@layouts/BaseLayout';
import { useListReadHashtag, useListReadHashtagFilter } from '@modules/hashtag';
import { useListReadPost, useListReadPostFilter } from '@modules/post';

import filterSearch, { DEFAULT_CUR_PAGE, DEFAULT_PER_PAGE, parseQuery, ViewMode } from './filterSearch';
import InfiniteMode from './InfiniteListRead';
import PaginationMode from './PaginationRead';
import { StyledFilter } from './styles';

const { Title } = Typography;
const { Option } = Select;

const PostListReadView = () => {
  const router = useRouter();

  const { mode } = useMemo(() => parseQuery(router.query), [router.query]);
  const { filter: listReadPostFilter } = useListReadPostFilter();

  const {
    status,
    data: postListData,
    error: PostListError,
    isMoreRead,
    totalCount,
  } = useListReadPost({ filter: listReadPostFilter, mode });

  const [hashtagKeyword, setHashtagKeyword] = useState('');
  const { filter: listReadHashtagFilter, changeFilter: changeListReadHashtagFilter } = useListReadHashtagFilter();
  const { data: hashtagListData, error: hashtagListError } = useListReadHashtag(listReadHashtagFilter);

  const hashTagOptions = useMemo(() => {
    if (!hashtagListError) {
      return hashtagListData.map((hashtag) => ({
        value: hashtag.name,
        label: `#${hashtag.name}`,
      }));
    }
    return [];
  }, [hashtagListData, hashtagListError]);

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

  const handleChangeHashtagKeyword = useCallback((e) => {
    setHashtagKeyword(e.target.value);
  }, []);

  const handleSelectHashTagOption = (hashtag: string) => {
    filterSearch(router.pathname, router.query, { page: DEFAULT_CUR_PAGE, hashtag });
  };

  useEffect(() => {
    setHashtagKeyword(listReadPostFilter?.hashtag || '');
  }, [listReadPostFilter?.hashtag]);

  useEffect(() => {
    debounce(() => {
      if (hashtagKeyword) changeListReadHashtagFilter({ keyword: hashtagKeyword });
    }, 300)();
  }, [changeListReadHashtagFilter, hashtagKeyword]);

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
              <AutoComplete
                className="auto-search-box"
                dropdownMatchSelectWidth={282}
                options={hashTagOptions}
                onSelect={handleSelectHashTagOption}
                value={hashtagKeyword}
              >
                <Input
                  className="search-input"
                  size="large"
                  onChange={handleChangeHashtagKeyword}
                  suffix={<SearchOutlined />}
                />
              </AutoComplete>
            </div>
          </Space>
        </StyledFilter>
      }
    >
      {listReadPostFilter.hashtag && <Title>#{listReadPostFilter.hashtag}</Title>}
      {mode === 'infinite' && (
        <InfiniteMode
          status={status}
          postList={postListData}
          isMoreRead={isMoreRead}
          errorMsg={PostListError?.resMsg}
        />
      )}
      {mode === 'page' && (
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
