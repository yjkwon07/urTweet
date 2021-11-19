const express = require('express');

const { Post, Comment, Image, Hashtag } = require('../models');
const { findPost, findRetweetPost, findPostWithoutUserPassword } = require('../query/post');
const { findCommentWithoutUserPassword } = require('../query/comment');
const { isLoggedIn } = require('./middlewares');
const { resDataFormat, resErrorDataFormat, resItemDataFormat } = require('../utils/resFormat');
const { SUCCESS, CLIENT_ERROR, INFO_EMPTY_ERROR } = require('../constant');

const router = express.Router();

// POST /post (게시글 등록)
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const myId = parseInt(req.user.id, 10);
    const content = req.body.content;
    const image = req.body.image;
    const hashtagList = Array.from(new Set(content.match(/#[^\s#]+/g)?.map((tag) => tag.slice(1).toLowerCase())));

    const post = await Post.create({
      UserId: myId,
      content,
    });
    if (hashtagList.length) {
      const result = await Promise.all(
        hashtagList.map((hashtag) => Hashtag.findOrCreate({ where: { name: hashtag } })),
      );
      await post.addHashtags(result.map((hashtag) => hashtag[0]));
    }
    if (image) {
      const images = await Promise.all(image.map((image) => Image.create({ src: image })));
      await post.addImages(images);
    }

    const postWithoutUserPassword = await findPostWithoutUserPassword({ id: post.id });

    res.status(SUCCESS).send(resDataFormat(SUCCESS, '등록완료', postWithoutUserPassword));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /post/:postId/retweet (리트윗)
router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {
  try {
    const myId = parseInt(req.user.id, 10);
    const postId = parseInt(req.params.postId, 10);

    const post = await findRetweetPost({ id: postId });
    if (!post) {
      return res.status(INFO_EMPTY_ERROR).send(resErrorDataFormat(INFO_EMPTY_ERROR, '존재하지 않는 게시글입니다.'));
    }
    if (myId === post.UserId || post.Retweet?.UserId === myId) {
      return res.status(CLIENT_ERROR).send(resErrorDataFormat(CLIENT_ERROR, '자신의 글은 리트윗할 수 없습니다.'));
    }
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await findPost({ UserId: myId, RetweetId: retweetTargetId });
    if (exPost) {
      return res.status(CLIENT_ERROR).send(resErrorDataFormat(CLIENT_ERROR, '이미 리트윗했습니다.'));
    }
    const retweetPost = await Post.create({
      UserId: myId,
      RetweetId: retweetTargetId,
      content: 'retweet',
    });

    const postWithoutUserPassword = await findPostWithoutUserPassword({ id: retweetPost.id });

    res.status(SUCCESS).send(resDataFormat(SUCCESS, '등록완료', postWithoutUserPassword));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /post/:postId (게시글 조회)
router.get('/:postId', async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId, 10);

    const post = await findPost({ id: postId });
    if (!post) {
      return res.status(SUCCESS).send(resErrorDataFormat(INFO_EMPTY_ERROR, '존재하지 않는 게시글입니다.'));
    }

    const postWithoutUserPassword = await findPostWithoutUserPassword({ id: postId });

    res.status(SUCCESS).send(resItemDataFormat(SUCCESS, '', postWithoutUserPassword));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PATCH /post/:postId (게시글 수정)
router.patch('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    const myId = parseInt(req.user.id, 10);
    const postId = parseInt(req.params.postId, 10);
    const content = req.body.content;
    const image = req.body.image;
    const hashtagList = Array.from(new Set(content.match(/#[^\s#]+/g)?.map((tag) => tag.slice(1).toLowerCase())));

    await Post.update(
      { content },
      {
        where: {
          id: postId,
          UserId: myId,
        },
      },
    );
    const post = await findPost({ id: postId });
    if (hashtagList.length) {
      const result = await Promise.all(
        hashtagList.map((hashtag) => Hashtag.findOrCreate({ where: { name: hashtag } })),
      );
      await post.setHashtags(result.map((hashtag) => hashtag[0]));
    }
    if (image) {
      const images = await Promise.all(image.map((image) => Image.create({ src: image })));
      await post.setImages(images);
    }

    const postWithoutUserPassword = await findPostWithoutUserPassword({ id: post.id });

    res.status(SUCCESS).send(resDataFormat(SUCCESS, '수정완료', postWithoutUserPassword));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /post/:postId (게시글 삭제)
router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    const myId = parseInt(req.user.id, 10);
    const postId = parseInt(req.params.postId, 10);

    const post = await findPost({ id: postId });
    if (!post) {
      return res.status(INFO_EMPTY_ERROR).send(resErrorDataFormat(INFO_EMPTY_ERROR, '게시글이 존재하지 않습니다.'));
    }
    await Post.destroy({
      where: {
        id: postId,
        UserId: myId,
      },
    });

    res.status(SUCCESS).send(resDataFormat(SUCCESS, '삭제완료', { PostId: postId }));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /post/:postId/comment (댓글 작성)
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const myId = parseInt(req.user.id, 10);
    const postId = parseInt(req.params.postId, 10);

    const post = await findPost({ id: postId });
    if (!post) {
      return res.status(INFO_EMPTY_ERROR).send(resErrorDataFormat(INFO_EMPTY_ERROR, '게시글이 존재하지 않습니다.'));
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: postId,
      UserId: myId,
    });

    const result = await findCommentWithoutUserPassword({ id: comment.id });

    res.status(SUCCESS).send(resDataFormat(SUCCESS, '등록완료', result));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PATCH /post/:postId/like (좋아요)
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const myId = parseInt(req.user.id, 10);
    const postId = parseInt(req.params.postId, 10);

    const post = await findPost({ id: postId });
    if (!post) {
      return res.status(INFO_EMPTY_ERROR).send(resErrorDataFormat(INFO_EMPTY_ERROR, '게시글이 존재하지 않습니다.'));
    }
    await post.addLikers(myId);

    res.status(SUCCESS).send(resDataFormat(SUCCESS, '등록완료', { PostId: postId, UserId: myId }));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /post/:postId/like (좋아요 삭제)
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const myId = parseInt(req.user.id, 10);
    const postId = parseInt(req.params.postId, 10);

    const post = await findPost({ id: postId });
    if (!post) {
      return res.status(INFO_EMPTY_ERROR).send(resErrorDataFormat(INFO_EMPTY_ERROR, '게시글이 존재하지 않습니다.'));
    }
    await post.removeLikers(myId);

    res.status(SUCCESS).send(resDataFormat(SUCCESS, '취소완료', { PostId: postId, UserId: myId }));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
