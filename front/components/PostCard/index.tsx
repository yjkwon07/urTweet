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
import { Card, Popover, Button, Avatar, Divider, message, Popconfirm, Tooltip } from 'antd';
import moment from 'dayjs';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { likePost, removePost, retweetPost, unlikePost } from '@modules/post';
import { IPost } from '@modules/post/@types/db';
import { userSelector } from '@modules/user';
import { GET_USER_URL, PASS_HREF } from '@utils/urls';

import CommentForm from './CommentForm';
import CommentList from './CommentList';
import FollowButton from './FollowButton';
import PostCardContent from './PostCardContent';
import PostImages from './PostImages';

export interface IProps {
  data: IPost;
}

const PostCard = ({ data }: IProps) => {
  const dispatch = useDispatch();
  const myId = useSelector(userSelector.myData)?.id;
  const { status: removePostStatus } = useFetchStatus(removePost.TYPE);

  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const isLike = useMemo(() => !!data.Likers.find((v) => v.id === myId)?.id, [data.Likers, myId]);

  const handleRetweet = useCallback(() => {
    if (!myId) {
      message.warn('로그인이 필요합니다.');
      return;
    }
    dispatch(retweetPost.requset({ postId: data.id }));
  }, [data.id, dispatch, myId]);

  const handleToggleLike = useCallback(() => {
    if (!myId) {
      message.warn('로그인이 필요합니다.');
      return;
    }
    if (!isLike) dispatch(likePost.requset({ postId: data.id }));
    else dispatch(unlikePost.requset({ postId: data.id }));
  }, [data.id, dispatch, isLike, myId]);

  const handleToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const handleEditMode = useCallback(() => {
    setEditMode(true);
  }, []);

  const handleCancleEditMode = useCallback(() => {
    setEditMode(false);
  }, []);

  const handleRemovePost = useCallback(() => {
    if (!myId) {
      message.warn('로그인이 필요합니다.');
      return;
    }
    dispatch(removePost.requset({ postId: data.id }));
  }, [data.id, dispatch, myId]);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={data.Images.length && <PostImages images={data.Images} />}
        hoverable
        actions={[
          <RetweetOutlined key="retweet" title="리트윗" onClick={handleRetweet} />,
          isLike ? (
            <HeartTwoTone twoToneColor="#eb2f96" title="좋아요" key="heart" onClick={handleToggleLike} />
          ) : (
            <HeartOutlined key="heart" title="좋아요" onClick={handleToggleLike} />
          ),
          <MessageOutlined key="comment" title="댓글" onClick={handleToggleComment} />,
          <Popover
            key="more"
            content={
              myId &&
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
                    <Button loading={removePostStatus === 'LOADING'}>
                      <DeleteOutlined /> 삭제
                    </Button>
                  </Popconfirm>
                </Button.Group>
              )
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={data.RetweetId && `${data.User.nickname}님이 리트윗하셨습니다.`}
        extra={myId && data.User.id !== myId && <FollowButton data={data} />}
      >
        {data.RetweetId && data.Retweet ? (
          <Card cover={data.Retweet.Images.length && <PostImages images={data.Retweet.Images} />}>
            <Card.Meta
              avatar={
                <Link href={GET_USER_URL(data.Retweet.User.id.toString())} passHref>
                  <a href={PASS_HREF}>
                    <Avatar>{data.Retweet.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={
                <div>
                  {data.Retweet.User.nickname}
                  <Tooltip title={moment(data.Retweet.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                    <span style={{ color: '#ccc', marginLeft: '10px', fontSize: '14px' }}>
                      {moment(data.Retweet.createdAt).fromNow()}
                    </span>
                  </Tooltip>
                </div>
              }
              description={
                <PostCardContent postId={data.id} postContent={data.content} onCancleEditMode={handleCancleEditMode} />
              }
            />
          </Card>
        ) : (
          <Card.Meta
            avatar={
              <Link href={GET_USER_URL(data.User.id.toString())} passHref>
                <a href={PASS_HREF}>
                  <Avatar>{data.User.nickname[0]}</Avatar>
                </a>
              </Link>
            }
            title={
              <div>
                {data.User.nickname}
                <Tooltip title={moment(data.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                  <span style={{ color: '#ccc', marginLeft: '10px', fontSize: '14px' }}>
                    {moment(data.createdAt).fromNow()}
                  </span>
                </Tooltip>
              </div>
            }
            description={
              <PostCardContent
                editMode={editMode}
                postId={data.id}
                postContent={data.content}
                onCancleEditMode={handleCancleEditMode}
              />
            }
          />
        )}
        {commentFormOpened && (
          <div>
            <Divider plain>{`${data.Comments.length}개의 댓글`}</Divider>
            <CommentList data={data} />
            {myId && <CommentForm data={data} />}
          </div>
        )}
      </Card>
    </div>
  );
};

export default PostCard;
