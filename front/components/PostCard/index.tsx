import React, { useCallback, useMemo, useState } from 'react';

import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from '@ant-design/icons';
import { Card, Popover, Button, Divider, message, Popconfirm, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { likePost, removePost, retweetPost, unlikePost } from '@modules/post';
import { IPost } from '@modules/post/@types/db';
import { userSelector } from '@modules/user';
import requiredLogin from '@utils/requiredLogin';

import CommentForm from './CommentForm';
import CommentList from './CommentList';
import FollowButton from './FollowButton';
import PostCardContent from './PostCardContent';
import PostCardMeta from './PostCardMeta';

interface IProps {
  data: IPost;
}

const PostCard = ({ data }: IProps) => {
  const dispatch = useDispatch();
  const myId = useSelector(userSelector.myData)?.id;
  const { status: removePostStatus } = useFetchStatus(removePost.TYPE);

  const [commentListOpened, setCommentListOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const isLike = useMemo(() => !!data.Likers.find((v) => v.id === myId)?.id, [data.Likers, myId]);

  const handleRetweet = useCallback(async () => {
    try {
      if (!requiredLogin()) return;
      await dispatch(retweetPost.asyncTunk({ postId: data.id }));
    } catch (error) {
      message.error(JSON.stringify(error.response.data));
    }
  }, [data.id, dispatch]);

  const handleToggleLike = useCallback(() => {
    if (!requiredLogin()) return;
    if (!isLike) dispatch(likePost.requset({ postId: data.id }));
    else dispatch(unlikePost.requset({ postId: data.id }));
  }, [data.id, dispatch, isLike]);

  const handleToggleComment = useCallback(() => {
    setCommentListOpened((prev) => !prev);
  }, []);

  const handleEditMode = useCallback(() => {
    setEditMode(true);
  }, []);

  const handleCancleEditMode = useCallback(() => {
    setEditMode(false);
  }, []);

  const handleRemovePost = useCallback(() => {
    if (!requiredLogin()) return;
    dispatch(removePost.requset({ postId: data.id }));
  }, [data.id, dispatch]);

  return (
    <Card
      actions={[
        <Tooltip key="retweet" placement="bottom" title="리트윗">
          <RetweetOutlined onClick={handleRetweet} />
        </Tooltip>,
        isLike ? (
          <Tooltip key="heart-cancel" placement="bottom" title="좋아요 취소">
            <HeartTwoTone twoToneColor="#eb2f96" onClick={handleToggleLike} />
          </Tooltip>
        ) : (
          <Tooltip key="hear" placement="bottom" title="좋아요">
            <HeartOutlined onClick={handleToggleLike} />
          </Tooltip>
        ),
        <Tooltip key="comment" placement="bottom" title="댓글">
          <MessageOutlined onClick={handleToggleComment} />
        </Tooltip>,
        <Tooltip key="more" placement="bottom" title="더보기">
          <Popover
            trigger="click"
            content={
              data.User.id === myId && (
                <Button.Group>
                  {!data.RetweetId && (
                    <Button type="primary" onClick={handleEditMode}>
                      <EditOutlined /> 수정
                    </Button>
                  )}
                  <Popconfirm
                    title="정말로 삭제하시겠습니까?"
                    okText="삭제"
                    onConfirm={handleRemovePost}
                    cancelText="취소"
                  >
                    <Button type="primary" danger loading={removePostStatus === 'LOADING'}>
                      <DeleteOutlined /> 삭제
                    </Button>
                  </Popconfirm>
                </Button.Group>
              )
            }
          >
            <EllipsisOutlined />
          </Popover>
        </Tooltip>,
      ]}
    >
      <PostCardMeta
        userId={data.User.id.toString()}
        nickname={data.User.nickname}
        createdAt={data.createdAt}
        actions={myId && data.User.id !== myId && <FollowButton userId={data.UserId} />}
        description={
          data.RetweetId && data.Retweet ? (
            <>
              <div style={{ marginBottom: 10 }}>
                <RetweetOutlined alt="리트윗" /> {data.User.nickname}님이 리트윗하셨습니다.
              </div>
              <Card style={{ borderRadius: 20 }}>
                <PostCardMeta
                  userId={data.Retweet.UserId.toString()}
                  nickname={data.Retweet.User.nickname}
                  createdAt={data.Retweet.createdAt}
                  actions={myId && data.Retweet.UserId !== myId && <FollowButton userId={data.Retweet.UserId} />}
                  description={
                    <PostCardContent
                      editMode={editMode}
                      postId={data.id}
                      postContent={data.content}
                      images={data.Retweet.Images}
                      onCancleEditMode={handleCancleEditMode}
                    />
                  }
                />
              </Card>
            </>
          ) : (
            <PostCardContent
              editMode={editMode}
              postId={data.id}
              postContent={data.content}
              images={data.Images}
              onCancleEditMode={handleCancleEditMode}
            />
          )
        }
      />
      {commentListOpened && (
        <div>
          <Divider plain>{`${data.Comments.length}개의 댓글`}</Divider>
          <CommentList commentList={data.Comments} />
          {myId && <CommentForm postId={data.id} />}
        </div>
      )}
    </Card>
  );
};

export default PostCard;
