import { useCallback, useEffect, useMemo, useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';
import { useRouter } from 'next/router';

import useDebounce from '@hooks/useDebounce';
import { useListReadHashtag } from '@modules/hashtag';

import { PostListReadPageFilter } from '../utils';

export interface IProps {
  hashtag: string;
}

function AutoCompleteHashTag({ hashtag }: IProps) {
  const router = useRouter();

  const [hashtagKeyword, setHashtagKeyword] = useState('');
  const debounceHashtagKeyword = useDebounce(hashtagKeyword, 300);
  const { data: hashtagListData, error: hashtagListError } = useListReadHashtag({ keyword: debounceHashtagKeyword });

  const hashTagOptions = useMemo(() => {
    if (hashtagListData && !hashtagListError) {
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
