const express = require('express');

const { findPost, findPostWithoutUserPassword } = require('../query/post');
const { findCommentWithoutUserPassword } = require('../query/comment');
const { Post, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares');
const { SUCCESS, CLIENT_ERROR } = require('../constant');

const router = express.Router();

// POST /post (게시글 업로드)
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    const postWithoutUserPassword = await findPostWithoutUserPassword({ id: post.id });
    res.status(SUCCESS).send(postWithoutUserPassword);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /post/:postId/comment (게시글 작성)
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await findPost({ id: req.params.postId });
    if (!post) {
      return res.status(CLIENT_ERROR).send('존재하지 않는 게시글입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    const fullComment = await findCommentWithoutUserPassword({ id: comment.id });
    res.status(SUCCESS).send(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PATCH /post/:postId/like (좋아요)
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await findPost({ id: req.params.postId });
    if (!post) {
      return res.status(CLIENT_ERROR).send('게시글이 존재하지 않습니다.');
    }
    await post.addLikers(req.user.id);
    res.status(SUCCESS).send({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /post/:postId/like (좋아요 삭제)
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await findPost({ id: req.params.postId });
    if (!post) {
      return res.status(CLIENT_ERROR).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id);
    res.status(SUCCESS).send({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PATCH /post/:postId (게시글 수정)
router.patch('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    const post = await findPost({ id: req.params.postId });
    if (!post) {
      return res.status(CLIENT_ERROR).send('게시글이 존재하지 않습니다.');
    }
    await Post.update(
      {
        content: req.body.content,
      },
      {
        where: {
          id: req.params.postId,
          UserId: req.user.id,
        },
      },
    );
    res.status(SUCCESS).send({ PostId: parseInt(req.params.postId, 10), content: req.body.content });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /post/:postId (게시글 삭제)
router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    const post = await findPost({ id: req.params.postId });
    if (!post) {
      return res.status(CLIENT_ERROR).send('게시글이 존재하지 않습니다.');
    }
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    res.status(SUCCESS).send({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
