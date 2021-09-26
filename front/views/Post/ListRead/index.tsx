import { useCallback, useEffect, useState } from 'react';

import { InsertRowBelowOutlined, InsertRowRightOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';

import BaseLayout from '@layouts/BaseLayout';
import { ListReadPostUrlQuery, postAction, useListReadPost } from '@modules/post';
import { useSearchFilter } from '@modules/searchFilter';

import InfiniteMode from './InfiniteListRead';
import PaginationMode from './PaginationRead';
import { StyledFilter } from './styles';

const { Option } = Select;

const DEFAULT_CUR_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

type ViewMode = 'infinite' | 'page';

const PostListReadView = () => {
  const dispatch = useDispatch();

  const { filter, changeFilter } = useSearchFilter<ListReadPostUrlQuery>('LIST_READ_POST');
  const [mode, setMode] = useState<ViewMode>('infinite');
  const {
    status,
    data: postListData,
    error: PostListError,
    isMoreRead,
    totalCount,
  } = useListReadPost({ filter, mode });

  const handleRefreshPostListData = useCallback(() => {
    changeFilter({ page: DEFAULT_CUR_PAGE, pageSize: DEFAULT_PER_PAGE, hashtag: '', userId: undefined });
  }, [changeFilter]);

  const handleChangePageSize = useCallback(
    (value) => {
      changeFilter({
        page: 1,
        pageSize: value,
      });
    },
    [changeFilter],
  );

  const handleChangeMode = useCallback(
    (mode: ViewMode) => () => {
      setMode(mode);
    },
    [],
  );

  useEffect(() => {
    if (mode === 'infinite') {
      if (filter?.page !== DEFAULT_CUR_PAGE) {
        dispatch(postAction.listDataReset());
        handleRefreshPostListData();
      }
    }
  }, [dispatch, filter?.page, handleRefreshPostListData, mode]);

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
