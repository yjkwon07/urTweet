import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';

import { useListReadHashtag, useListReadHashtagFilter } from '@modules/hashtag';
import { useListReadPost } from '@modules/post';

import { pageFilter } from '../config';

function AutoCompleteHashTag() {
  const router = useRouter();

  const { filter: listReadPostFilter } = useListReadPost();

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

  const handleChangeHashtagKeyword = useCallback((e) => {
    setHashtagKeyword(e.target.value);
  }, []);

  const handleSelectHashTagOption = (hashtag: string) => {
    pageFilter.filterSearch(router.pathname, router.query, {
      page: pageFilter.defaultOption.DEFAULT_CUR_PAGE,
      hashtag,
    });
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
