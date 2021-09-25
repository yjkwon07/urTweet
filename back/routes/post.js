const express = require('express');

const { findPost, findRetweetPost, findPostWithoutUserPassword } = require('../query/post');
const { findCommentWithoutUserPassword } = require('../query/comment');
const { Post, Comment, Image, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');
const { SUCCESS, CLIENT_ERROR, PAGE_ERROR } = require('../constant');
const { resDataFormat, resErrorDataFormat } = require('../utils/resFormat');

const router = express.Router();

// POST /post (게시글 업로드)
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const content = req.body.content;
    const myId = req.user.id;
    const image = req.body.image;
    const hashtagList = content.match(/#[^\s#]+/g);

    const post = await Post.create({
      UserId: myId,
      content,
    });
    if (hashtagList) {
      const result = await Promise.all(
        Array.from(new Set(hashtagList.map((tag) => tag.slice(1).toLowerCase()))).map((tag) =>
          Hashtag.findOrCreate({
            where: { name: tag },
          }),
        ),
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
    const postId = req.params.postId;
    const myId = req.user.id;

    const post = await findRetweetPost({ id: postId });
    if (!post) {
      return res.status(CLIENT_ERROR).send(resErrorDataFormat(CLIENT_ERROR, '존재하지 않는 게시글입니다.'));
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
    const postId = req.params.postId;
    const post = await findPost({ id: postId });
    if (!post) {
      return res.status(PAGE_ERROR).send('존재하지 않는 게시글입니다.');
    }
    const postWithoutUserPassword = await findPostWithoutUserPassword({ id: postId });
    res.status(SUCCESS).send(resDataFormat(postWithoutUserPassword));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PATCH /post/:postId (게시글 수정)
router.patch('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const myId = req.user.id;
    const content = req.body.content;
    const image = req.body.image;
    const hashtags = content.match(/#[^\s#]+/g);

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
    if (hashtags) {
      const result = await Promise.all(
        Array.from(new Set(hashtags.map((tag) => tag.slice(1).toLowerCase()))).map((tag) =>
          Hashtag.findOrCreate({
            where: { name: tag },
          }),
        ),
      );
      await post.setHashtags(result.map((v) => v[0]));
    }
    if (image) {
      const images = await Promise.all(image.map((image) => Image.create({ src: image })));
      await post.setImages(images);
    }
    res.status(SUCCESS).send(resDataFormat(SUCCESS, '수정완료', post));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /post/:postId (게시글 삭제)
router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId, 10);
    const myId = parseInt(req.user.id, 10);

    const post = await findPost({ id: postId });
    if (!post) {
      return res.status(CLIENT_ERROR).send('게시글이 존재하지 않습니다.');
    }
    await Post.destroy({
      where: {
        id: postId,
        UserId: myId,
      },
    });
    res.status(SUCCESS).send({ PostId: postId });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /post/:postId/comment (댓글 작성)
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const myId = req.user.id;

    const post = await findPost({ id: postId });
    if (!post) {
      return res.status(CLIENT_ERROR).send('존재하지 않는 게시글입니다.');
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
    const postId = parseInt(req.params.postId, 10);
    const myId = parseInt(req.user.id, 10);

    const post = await findPost({ id: postId });
    if (!post) {
      return res.status(CLIENT_ERROR).send('게시글이 존재하지 않습니다.');
    }
    await post.addLikers(myId);
    res.status(SUCCESS).send({ PostId: postId, UserId: myId });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /post/:postId/like (좋아요 삭제)
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId, 10);
    const myId = parseInt(req.user.id, 10);

    const post = await findPost({ id: postId });
    if (!post) {
      return res.status(CLIENT_ERROR).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(myId);
    res.status(SUCCESS).send({ PostId: postId, UserId: myId });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
