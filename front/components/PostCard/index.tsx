import { useCallback, useMemo, useState } from 'react';

import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  ExportOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from '@ant-design/icons';
import { Popover, Button, Divider, message, Tooltip, Modal } from 'antd';
import cls from 'classnames';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/useAppRedux';
import { fetchStatusSelector } from '@modules/fetchStatus';
import { postAction } from '@modules/post';
import { Post } from '@modules/post/@types/db';
import { useReadMyUser } from '@modules/user';
import isCustomAxiosError from '@utils/isCustomAxiosError';
import requiredLogin from '@utils/requiredLogin';
import { PASS_HREF } from '@utils/urls';
import { PostReadPageFilter } from '@views/Post/Read/utils';

import CommentForm from './CommentForm';
import CommentList from './CommentList';
import EditStatusPostCardContent from './EditStatusPostCardContent';
import FollowButton from './FollowButton';
import PostCardMeta from './PostCardMeta';
import { StyledCard, StyledRetweetCard } from './styles';

const { confirm } = Modal;

export interface IProps {
  data: Post;
  initCommentListOpen?: boolean;
}

const PostCard = ({ data, initCommentListOpen = false }: IProps) => {
  const dispatch = useDispatch();
  const { status: removePostStatus } = useAppSelector(
    fetchStatusSelector.byFetchAction(postAction.fetchRemovePost, data.id),
  );
  const { data: myData } = useReadMyUser();

  const [morePopOverOpen, setMorePopOverOpen] = useState(false);
  const [commentListOpen, setCommentListOpen] = useState(initCommentListOpen);
  const [editMode, setEditMode] = useState(false);
  const isLike = useMemo(() => !!data.Likers.find((Liker) => Liker.id === myData?.id), [data.Likers, myData?.id]);

  const handleRetweet = useCallback(async () => {
    try {
      if (!requiredLogin()) return;
      await dispatch(postAction.fetchCreateRetweet.asyncThunk({ postId: data.id }));
    } catch (error) {
      if (isCustomAxiosError(error)) {
        message.error(JSON.stringify(error.response.data.resMsg));
      }
    }
  }, [data.id, dispatch]);

  const handleToggleLike = useCallback(() => {
    if (!requiredLogin()) return;
    if (!isLike) dispatch(postAction.fetchLikePost.request({ postId: data.id }));
    else dispatch(postAction.fetchUnlikePost.request({ postId: data.id }));
  }, [data.id, dispatch, isLike]);

  const handleToggleCommentList = useCallback(() => {
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

  const handleRemoveConfirmPost = useCallback(() => {
    confirm({
      title: '정말로 삭제 하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      content: '삭제시 해당 컨텐츠는 복구 불가 합니다.',
      async onOk() {
        dispatch(postAction.fetchRemovePost.request({ postId: data.id }, { actionList: [data.id] }));
      },
    });
  }, [data.id, dispatch]);

  return (
    <StyledCard
      actions={[
        <Tooltip key="retweet" placement="bottom" title="리트윗">
          <RetweetOutlined className={cls({ retweet: data.RetweetId })} onClick={handleRetweet} />
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
          <MessageOutlined onClick={handleToggleCommentList} />
        </Tooltip>,
        <Tooltip key="more" placement="bottom" title="더보기">
          <Popover
            trigger="onclick"
            title="더보기"
            visible={morePopOverOpen}
            onVisibleChange={handleToggleMorePopOver}
            content={
              <div role="presentation" onClick={handleToggleMorePopOver}>
                <p>
                  <Button type="text" ghost size="small">
                    <Link href={new PostReadPageFilter({ id: data.id }).url} passHref>
                      <a href={PASS_HREF}>
                        <ExportOutlined /> 상세페이지 이동
                      </a>
                    </Link>
                  </Button>
                </p>
                {data.User.id === myData?.id && !data.RetweetId && (
                  <p>
                    <Button type="text" ghost size="small" onClick={handleEditMode}>
                      <EditOutlined /> 수정
                    </Button>
                  </p>
                )}
                {data.User.id === myData?.id && (
                  <p>
                    <Button
                      type="text"
                      ghost
                      size="small"
                      loading={removePostStatus === 'LOADING'}
                      onClick={handleRemoveConfirmPost}
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
        actions={myData?.id && data.User.id !== myData?.id && <FollowButton userId={data.UserId} />}
        description={
          data.Retweet ? (
            <>
              <div className={cls('mb-10', { retweet: data.RetweetId })}>
                <RetweetOutlined alt="리트윗" /> {data.User.nickname}님이 리트윗하셨습니다.
              </div>
              <StyledRetweetCard>
                <PostCardMeta
                  userId={data.Retweet.UserId.toString()}
                  nickname={data.Retweet.User.nickname}
                  createdAt={data.Retweet.createdAt}
                  actions={
                    myData?.id && data.Retweet.UserId !== myData?.id && <FollowButton userId={data.Retweet.UserId} />
                  }
                  description={
                    <EditStatusPostCardContent
                      editMode={editMode}
                      postId={data.id}
                      postContent={data.content}
                      imageList={data.Retweet.Images}
                      onCancelEditMode={handleCancelEditMode}
                    />
                  }
                />
              </StyledRetweetCard>
            </>
          ) : (
            <EditStatusPostCardContent
              editMode={editMode}
              postId={data.id}
              postContent={data.content}
              imageList={data.Images}
              onCancelEditMode={handleCancelEditMode}
            />
          )
        }
      />
      <div className="mt-10 status-detail">
        <div>
          <span>
            <HeartTwoTone twoToneColor="#eb2f96" /> {data.Likers.length} like
          </span>
        </div>
        <div>
          <span>댓글 {data.Comments.length}개</span>
        </div>
      </div>
      {commentListOpen && (
        <>
          <Divider plain />
          <CommentList commentList={data.Comments} />
          {myData?.id && <CommentForm userId={myData?.id} postId={data.id} />}
        </>
      )}
    </StyledCard>
  );
};

export default PostCard;
