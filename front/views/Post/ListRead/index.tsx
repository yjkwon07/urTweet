import { useCallback, useEffect, useState } from 'react';

import { InsertRowBelowOutlined, InsertRowRightOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space, Tooltip } from 'antd';

import BaseLayout from '@layouts/BaseLayout';
import { ListReadPostUrlQuery, useListReadPost } from '@modules/post';
import { useSearchFilter } from '@modules/searchFilter';

import InfiniteMode from './InfiniteListRead';
import PaginationMode from './PaginationRead';

const { Option } = Select;

const DEFAULT_CUR_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

const PostListReadView = () => {
  const { filter, changeFilter } = useSearchFilter<ListReadPostUrlQuery>('LIST_READ_POST', {
    page: DEFAULT_CUR_PAGE,
    pageSize: DEFAULT_PER_PAGE,
  });
  const [mode, setMode] = useState<'infinite' | 'page'>('infinite');
  const { status, data: postListData, isMoreRead, totalCount } = useListReadPost({ filter, mode });

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

  useEffect(() => {
    if (mode === 'infinite') {
      handleRefreshPostListData();
    }
  }, [handleRefreshPostListData, mode]);

  return (
    <BaseLayout
      filterGroup={
        <Space size={10} direction="vertical" style={{ width: '100%' }}>
          <div>
            <Space size={5}>
              <Tooltip title="스크롤">
                <Button shape="circle" icon={<InsertRowRightOutlined />} onClick={() => setMode('infinite')} />
              </Tooltip>
              <Tooltip title="페이지네이션">
                <Button shape="circle" icon={<InsertRowBelowOutlined />} onClick={() => setMode('page')} />
              </Tooltip>
            </Space>
          </div>
          <div>
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
          </div>
          <div>
            <Input size="large" prefix={<SearchOutlined />} style={{ borderRadius: 17 }} />
          </div>
        </Space>
      }
    >
      {mode === 'infinite' && (
        <InfiniteMode
          status={status}
          postList={postListData}
          isMoreRead={isMoreRead}
          errorMsg={status === 'FAIL' ? '정보를 불러오지 못했습니다.' : ''}
        />
      )}
      {mode === 'page' && <PaginationMode status={status} postList={postListData} totalCount={totalCount} />}
    </BaseLayout>
  );
};

export default PostListReadView;
