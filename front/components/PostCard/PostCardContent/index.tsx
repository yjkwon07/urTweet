import { useMemo } from 'react';

import Link from 'next/link';
import regexifyString from 'regexify-string';

import { Image as IImage } from '@modules/post/@types';
import { HOME_URL, PASS_HREF } from '@utils/urls';
import { pageFilter } from '@views/Post/ListRead/config';

import PostImages from '../PostImages';

export interface IProps {
  postContent: string;
  imageList: IImage[];
}

const PostCardContent = ({ postContent, imageList }: IProps) => {
  const HashTagPostContent = useMemo(
    () =>
      regexifyString({
        input: postContent,
        pattern: /(#[^\s#]+)/g,
        decorator(word, index) {
          if (word.match(/(#[^\s#]+)/)) {
            return (
              <Link
                href={`${HOME_URL}${pageFilter.queryString(pageFilter.parseQuery({ hashtag: word.slice(1) }))}`}
                key={index}
                passHref
              >
                <a href={PASS_HREF}>{word}</a>
              </Link>
            );
          }
          return word;
        },
      }),
    [postContent],
  );

  return (
    <>
      <div className="mb-10">{HashTagPostContent}</div>
      {!!imageList.length && <PostImages imageList={imageList} />}
    </>
  );
};

export default PostCardContent;
