import React, { useCallback, useMemo, useState } from 'react';

import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from '@ant-design/icons';
import { Card, Popover, Button, Divider, message, Tooltip, Modal } from 'antd';
import classNames from 'classnames';
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
import { StyledCard } from './styles';

const { confirm } = Modal;

export interface IProps {
  data: IPost;
  collapse?: boolean;
}

const PostCard = ({ data, collapse = false }: IProps) => {
  const dispatch = useDispatch();
  const myId = useSelector(userSelector.myData)?.id;
  const { status: removePostStatus } = useFetchStatus(removePost.TYPE, data.id);

  const [morePopOverOpen, setMorePopOverOpen] = useState(false);
  const [commentListOpen, setCommentListOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const isLike = useMemo(() => !!data.Likers.find((v) => v.id === myId), [data.Likers, myId]);

  const handleRetweet = useCallback(async () => {
    try {
      if (!requiredLogin()) return;
      await dispatch(retweetPost.asyncThunk({ postId: data.id }));
    } catch (error) {
      message.error(JSON.stringify(error.response.data));
    }
  }, [data.id, dispatch]);

  const handleToggleLike = useCallback(() => {
    if (!requiredLogin()) return;
    if (!isLike) dispatch(likePost.request({ postId: data.id }));
    else dispatch(unlikePost.request({ postId: data.id }));
  }, [data.id, dispatch, isLike]);

  const handleToggleCommentListShow = useCallback(() => {
    setCommentListOpen((prev) => !prev);
  }, []);

  const handleEditMode = useCallback(() => {
    setEditMode(true);
  }, []);

  const handleCancelEditMode = useCallback(() => {
    setEditMode(false);
  }, []);

  const handleToggleMorePopOver = useCallback(() => {
    setMorePopOverOpen((prev) => !prev);
  }, []);

  const handleShowRemovePostConfirm = useCallback(() => {
    confirm({
      title: '정말로 삭제 하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      content: '삭제시 해당 컨텐츠는 복구 불가 합니다.',
      async onOk() {
        dispatch(removePost.request({ postId: data.id }, { actionList: [data.id] }));
      },
    });
  }, [data.id, dispatch]);

  return (
    <StyledCard
      className={classNames({ collapse })}
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
          <MessageOutlined onClick={handleToggleCommentListShow} />
        </Tooltip>,
        <Tooltip key="more" placement="bottom" title="더보기">
          <Popover
            trigger="onclick"
            visible={morePopOverOpen}
            onVisibleChange={handleToggleMorePopOver}
            content={
              <div role="presentation" onClick={handleToggleMorePopOver}>
                {data.User.id === myId && !data.RetweetId && (
                  <p>
                    <Button type="primary" ghost size="small" onClick={handleEditMode}>
                      <EditOutlined /> 수정
                    </Button>
                  </p>
                )}
                {data.User.id === myId && (
                  <p>
                    <Button
                      type="primary"
                      danger
                      ghost
                      size="small"
                      loading={removePostStatus === 'LOADING'}
                      onClick={handleShowRemovePostConfirm}
                    >
                      <DeleteOutlined /> 삭제
                    </Button>
                  </p>
                )}
              </div>
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
          data.Retweet ? (
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
                      onCancelEditMode={handleCancelEditMode}
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
              onCancelEditMode={handleCancelEditMode}
            />
          )
        }
      />
      {commentListOpen && (
        <>
          <Divider plain>{`${data.Comments.length}개의 댓글`}</Divider>
          <CommentList commentList={data.Comments} />
          {myId && <CommentForm postId={data.id} />}
        </>
      )}
    </StyledCard>
  );
};

export default PostCard;
