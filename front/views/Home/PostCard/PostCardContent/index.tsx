import React, { useState, useCallback } from 'react';

import { Button, Input } from 'antd';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { modifyPost } from '@modules/post';
import { IPost } from '@modules/post/@types/db';
import { GET_HASHTAG_URL, PASS_HREF } from '@utils/urls';

export interface IProps {
  data: IPost;
  editMode?: boolean;
  isUpdateLoading?: boolean;
  onCancleEditMode: () => void;
}

const PostCardContent = ({ data, editMode = false, isUpdateLoading = false, onCancleEditMode }: IProps) => {
  const dispatch = useDispatch();

  const [editText, setEditText] = useState(data.content);

  const onChangeText = useCallback((e) => {
    setEditText(e.target.value);
  }, []);

  const handleChangePost = useCallback(
    (content) => {
      dispatch(modifyPost.requset({ url: { postId: data.id }, body: { content } }));
      onCancleEditMode();
    },
    [data.id, dispatch, onCancleEditMode],
  );

  return (
    <div>
      {editMode ? (
        <>
          <Input.TextArea value={editText} onChange={onChangeText} />
          <Button.Group>
            <Button loading={isUpdateLoading} onClick={() => handleChangePost(editText)}>
              수정
            </Button>
            <Button type="dashed" onClick={onCancleEditMode}>
              취소
            </Button>
          </Button.Group>
        </>
      ) : (
        editText.split(/(#[^\s#]+)/g).map((word, i) => {
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
