import { useCallback, useEffect, useMemo, useState } from 'react';

import { InsertRowBelowOutlined, InsertRowRightOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Input, Select, Space, Tooltip, Typography } from 'antd';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';

import BaseLayout from '@layouts/BaseLayout';
import { ListReadHashtagUrlQuery, useListReadHashtag } from '@modules/hashtag';
import { ListReadPostUrlQuery, useListReadPost } from '@modules/post';
import { useSearchFilter } from '@modules/searchFilter';

import filterSearch, { ViewMode } from './filterSearch';
import InfiniteMode from './InfiniteListRead';
import PaginationMode from './PaginationRead';
import { StyledFilter } from './styles';

const { Title } = Typography;
const { Option } = Select;

const DEFAULT_CUR_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

const PostListReadView = () => {
  const router = useRouter();

  const { filter: listReadPostFilter } = useSearchFilter<ListReadPostUrlQuery>('LIST_READ_POST');
  const mode = useMemo<ViewMode>(() => (router.query.mode as ViewMode) || 'infinite', [router.query.mode]);
  const {
    status,
    data: postListData,
    error: PostListError,
    isMoreRead,
    totalCount,
  } = useListReadPost({ filter: listReadPostFilter, mode });

  const { filter: listReadHashtagFilter, changeFilter: changeListReadHashtagFilter } =
    useSearchFilter<ListReadHashtagUrlQuery>('LIST_READ_HASHTAG');
  const [hashtagKeyword, setHashtagKeyword] = useState('');
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
          page: listReadPostFilter?.page,
          mode,
        });
      }
    },
    [listReadPostFilter?.page, router],
  );

  useEffect(() => {
    setHashtagKeyword(listReadPostFilter?.hashtag || '');
  }, [listReadPostFilter?.hashtag]);

  const handleChangeHashtagKeyword = useCallback((e) => {
    setHashtagKeyword(e.target.value);
  }, []);

  useEffect(() => {
    debounce(() => {
      if (hashtagKeyword) changeListReadHashtagFilter({ keyword: hashtagKeyword });
    }, 300)();
  }, [changeListReadHashtagFilter, hashtagKeyword]);

  const handleSelectHashTagOption = (hashtag: string) => {
    filterSearch(router, {
      page: DEFAULT_CUR_PAGE,
      hashtag,
    });
  };

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
                <Select className="select" value={listReadPostFilter?.pageSize} onChange={handleChangePageSize}>
                  <Option value={10}>10개씩 보기</Option>
                  <Option value={20}>20개씩 보기</Option>
                  <Option value={30}>30개씩 보기</Option>
                </Select>
                <span className="search-result">총 {status !== 'LOADING' ? totalCount : '...'}건 검색</span>
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
      {listReadPostFilter?.hashtag && <Title>#{listReadPostFilter.hashtag}</Title>}
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
