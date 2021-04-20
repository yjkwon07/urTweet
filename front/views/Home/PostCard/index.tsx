import React, { useCallback, useState, VFC } from 'react';

import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import { Card, Popover, Button, Avatar, Comment, List } from 'antd';
import moment from 'dayjs';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { removePost } from '@modules/post';
import { IPost } from '@modules/post/@types/db';
import { userSelector } from '@modules/user';
import { GET_USER_URL, PASS_HREF } from '@utils/urls';

import CommentForm from './CommentForm';
import FollowButton from './FollowButton';
import PostCardContent from './PostCardContent';
import PostImages from './PostImages';

export interface IProps {
  data: IPost;
}

const PostCard: VFC<IProps> = ({ data }) => {
  const dispatch = useDispatch();
  const myId = useSelector(userSelector.myData)?.id;
  const { status: removePostStatus } = useFetchStatus(removePost.TYPE);

  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleRetweet = useCallback(() => {
    // ...
  }, []);

  const handleToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

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
    // ...
  }, []);

  const handleChangePost = useCallback(() => {
    // ...
  }, []);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={data.Images.length && <PostImages images={data.Images} />}
        hoverable
        actions={[
          <RetweetOutlined key="retweet" onClick={handleRetweet} />,
          liked ? (
            <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={handleToggleLike} />
          ) : (
            <HeartOutlined key="heart" onClick={handleToggleLike} />
          ),
          <MessageOutlined key="comment" onClick={handleToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {myId && data.User.id === myId ? (
                  <>
                    {!data.RetweetId && <Button onClick={handleEditMode}>수정</Button>}
                    <Button type="dashed" loading={removePostStatus === 'LOADING'} onClick={handleRemovePost}>
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={data.RetweetId && `${data.User.nickname}님이 리트윗하셨습니다.`}
        extra={myId && <FollowButton data={data} />}
      >
        {data.Retweet ? (
          <Card cover={data.Retweet.Images[0] && <PostImages images={data.Retweet.Images} />}>
            <div style={{ float: 'right' }}>{moment(data.createdAt).format('YYYY.MM.DD')}</div>
            <Card.Meta
              avatar={
                <Link href={GET_USER_URL(data.Retweet.User.id.toString())} prefetch={false} passHref>
                  <a href={PASS_HREF}>
                    <Avatar>{data.Retweet.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={data.Retweet.User.nickname}
              description={
                <PostCardContent
                  onChangePost={handleChangePost}
                  onCancelUpdate={handleCancleEditMode}
                  data={data.Retweet.content}
                />
              }
            />
          </Card>
        ) : (
          <>
            <div style={{ float: 'right' }}>{moment(data?.createdAt).format('YYYY.MM.DD')}</div>
            <Card.Meta
              avatar={
                <Link href={GET_USER_URL(data.User.id.toString())} prefetch={false} passHref>
                  <a href={PASS_HREF}>
                    <Avatar>{data?.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={data?.User.nickname}
              description={
                <PostCardContent
                  editMode={editMode}
                  onChangePost={handleChangePost}
                  onCancelUpdate={handleCancleEditMode}
                  data={data?.content}
                />
              }
            />
          </>
        )}
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm data={data} />
          <List
            header={`${data.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={data.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={
                    <Link href={GET_USER_URL(item.User.id.toString())} prefetch={false} passHref>
                      <a href={PASS_HREF}>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
