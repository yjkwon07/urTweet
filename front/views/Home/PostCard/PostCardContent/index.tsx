import React, { useState, useCallback, VFC } from 'react';

import { Button, Input } from 'antd';
import Link from 'next/link';

import { IPost } from '@modules/post/@types/db';
import { GET_HASHTAG_URL, PASS_HREF } from '@utils/urls';

export interface IProps {
  data: IPost['content'];
  editMode?: boolean;
  isUpdateLoading?: boolean;
  onChangePost: (text: string) => void;
  onCancelUpdate: () => void;
}

const PostCardContent: VFC<IProps> = ({
  data,
  editMode = false,
  isUpdateLoading = false,
  onChangePost,
  onCancelUpdate,
}) => {
  const [editText, setEditText] = useState(data);

  const onChangeText = useCallback((e) => {
    setEditText(e.target.value);
  }, []);

  return (
    // 첫 번째 게시글 #해시태그 #해시태그
    <div>
      {editMode ? (
        <>
          <Input.TextArea value={editText} onChange={onChangeText} />
          <Button.Group>
            <Button loading={isUpdateLoading} onClick={() => onChangePost(editText)}>
              수정
            </Button>
            <Button type="dashed" onClick={onCancelUpdate}>
              취소
            </Button>
          </Button.Group>
        </>
      ) : (
        data.split(/(#[^\s#]+)/g).map((word, i) => {
          if (word.match(/(#[^\s#]+)/)) {
            return (
              <Link href={GET_HASHTAG_URL(word.slice(1))} prefetch={false} key={i} passHref>
                <a href={PASS_HREF}>{word}</a>
              </Link>
            );
          }
          return word;
        })
      )}
    </div>
  );
};

export default PostCardContent;
