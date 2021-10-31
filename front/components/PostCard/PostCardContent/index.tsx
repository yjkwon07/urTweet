import { useMemo } from 'react';

import Link from 'next/link';
import regexifyString from 'regexify-string';

import { Image as IImage } from '@modules/post/@types';
import { PASS_HREF } from '@utils/urls';
import { PageFilter } from '@views/Post/ListRead/utils';

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
              <Link href={new PageFilter({ hashtag: word.slice(1) }).url()} key={index} passHref>
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
