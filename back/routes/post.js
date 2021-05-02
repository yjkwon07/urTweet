const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { findPost, findRetweetPost, findPostWithoutUserPassword } = require('../query/post');
const { findCommentWithoutUserPassword } = require('../query/comment');
const { Post, Comment, Image, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');
const { SUCCESS, CLIENT_ERROR, PAGE_ERROR } = require('../constant');

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads folder create');
  fs.mkdirSync('uploads');
}

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); // ss
      done(null, basename + '_' + new Date().getTime() + ext); // ss15184712891.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

// GET /post/:postId (게시글 조회)
router.get('/:postId', async (req, res, next) => {
  try {
    const post = await findPost({ id: req.params.postId });
    if (!post) {
      return res.status(PAGE_ERROR).send('존재하지 않는 게시글입니다.');
    }
    const postWithoutUserPassword = await findPostWithoutUserPassword({ id: post.id });
    res.status(SUCCESS).send(postWithoutUserPassword);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /post (게시글 업로드)
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    let hashtags = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    if (hashtags) {
      const result = await Promise.all(
        Array.from(new Set(hashtags.map((tag) => tag.slice(1).toLowerCase()))).map((tag) =>
          Hashtag.findOrCreate({
            where: { name: tag },
          }),
        ),
      ).then((_) => _.filter((_) => _[1]));
      await post.addHashtags(result.map((v) => v[0]));
    }
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
        await post.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const postWithoutUserPassword = await findPostWithoutUserPassword({ id: post.id });
    res.status(SUCCESS).send(postWithoutUserPassword);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /post/:postId/retweet (리트윗)
router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {
  try {
    const post = await findRetweetPost({ id: req.params.postId });
    if (!post) {
      return res.status(CLIENT_ERROR).send('존재하지 않는 게시글입니다.');
    }
    if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
      return res.status(CLIENT_ERROR).send('자신의 글은 리트윗할 수 없습니다.');
    }
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await findPost({ UserId: req.user.id, RetweetId: retweetTargetId });
    if (exPost) {
      return res.status(CLIENT_ERROR).send('이미 리트윗했습니다.');
    }
    const retweetPost = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: 'retweet',
    });
    const postWithoutUserPassword = await findPostWithoutUserPassword({ id: retweetPost.id });
    res.status(SUCCESS).send(postWithoutUserPassword);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /post/images (이미지 업로드)
router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
  res.send(req.files.map((v) => v.filename));
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
