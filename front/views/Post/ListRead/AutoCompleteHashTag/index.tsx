import { useCallback, useEffect, useMemo, useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';

import { useListReadHashtag } from '@modules/hashtag';

import { PostListReadPageFilter } from '../utils';

export interface IProps {
  hashtag: string;
}

function AutoCompleteHashTag({ hashtag }: IProps) {
  const router = useRouter();

  const [hashtagKeyword, setHashtagKeyword] = useState('');
  const { data: hashtagListData, error: hashtagListError, fetch: fetchListHashtag } = useListReadHashtag();

  const hashTagOptions = useMemo(() => {
    if (!hashtagListError) {
      return hashtagListData.map((hashtag) => ({
        value: hashtag.name,
        label: `#${hashtag.name}`,
      }));
    }
    return [];
  }, [hashtagListData, hashtagListError]);

  const handleChangeHashtagKeyword = useCallback((e) => {
    setHashtagKeyword(e.target.value);
  }, []);

  const handleSelectHashTagOption = useCallback(
    (hashtag: string) => {
      const pageFilter = new PostListReadPageFilter(router.query);
      pageFilter.search({
        page: PostListReadPageFilter.defaultOption.DEFAULT_CUR_PAGE,
        hashtag,
      });
    },
    [router.query],
  );

  useEffect(() => {
    setHashtagKeyword(hashtag);
  }, [hashtag]);

  useEffect(() => {
    debounce(() => {
      if (hashtagKeyword) fetchListHashtag({ keyword: hashtagKeyword });
    }, 300)();
  }, [fetchListHashtag, hashtagKeyword]);

  return (
    <AutoComplete
      className="auto-search-box"
      dropdownMatchSelectWidth={282}
      options={hashTagOptions}
      onSelect={handleSelectHashTagOption}
      value={hashtagKeyword}
    >
      <Input className="search-input" size="large" onChange={handleChangeHashtagKeyword} suffix={<SearchOutlined />} />
    </AutoComplete>
  );
}

export default AutoCompleteHashTag;
